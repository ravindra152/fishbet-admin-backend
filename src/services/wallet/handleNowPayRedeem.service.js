import config from '@src/configs/app.config';
import { AppError } from "@src/errors/app.error";
import { Logger } from '@src/libs/logger';
import { BaseHandler } from "@src/libs/logicBase";
import axios from 'axios';

export class HandleNowPayRedeemService extends BaseHandler {
    async run() {

        const { address, currency, amount } = this.args;
        try {

            const tokenOptions = JSON.stringify({
                email: config.get('nowPayment.email'),
                password: config.get('nowPayment.password'),
            })
            const token = await axios({
                method: 'POST',
                url: `${config.get('nowPayment.url')}/v1/auth`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: tokenOptions
            })

            const resConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: config.get('nowPayment.url') + '/v1/estimate?amount=' + amount + '&currency_from=' + 'usd' + '&currency_to=' + currency,
                headers: {
                    'x-api-key': config.get('nowPayment.apiKey')
                }
            }

            const amountTesponse = await axios(resConfig)
            const estimatedAmount = +amountTesponse.data.estimated_amount
            // payload for redeem
            const options = {
                ipn_callback_url: `${config.get("app.userBackendUrl")}/api/v1/payment/get-payment-status`,
                withdrawals: [
                    {
                        address,
                        currency,
                        amount: parseFloat(estimatedAmount.toFixed(6)),
                        ipn_callback_url: `${config.get("app.userBackendUrl")}/api/v1/payment/get-payment-status`,
                    },
                ],
            }

            const response = await axios({
                method: "POST",
                url: config.get("nowPayment.url") + "/v1/payout",
                headers: {
                    "x-api-key": config.get("nowPayment.apiKey"),
                    "Authorization": `Bearer ${token.data.token}`,
                    "Content-Type": "application/json"
                },
                data: options,
            })
            return response;

        }
        catch (error) {
          console.log("========= accept payment flow error =====",error)
            Logger.error(error.response.data)
            throw new AppError(error.response.data);
        }
    }
}
