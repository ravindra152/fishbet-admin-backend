'use strict'

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.bulkInsert({ tableName: 'cms_pages', schema: 'public' }, [
      {
        title: JSON.stringify({ EN: 'FAQ' }),
        slug: 'faq',
        content: JSON.stringify({
          EN: `
          <h4>Account</h4>
          <p>Q: How do I sign up at {{{siteName}}}?</p>
          <p>A: To sign up, click &quot;Sign Up!&quot; at the top left of the homepage. This will open a short sign-up form for you to fill in.</p>
          <p><br></p>
          <p>Q:&nbsp;I am still waiting to receive a verification email after completing the sign-up form - how do I solve this issue?</p>
          <p>A: If you still need to receive verification. You can contact our support team, who will verify your account manually if the problem persists.</p>
          <p><br></p>
          <p>Q: I need help opening an account. What shall I do?</p>
          <p>A: Make sure that you have not registered an account. If in doubt, type the email address you think you might have used to register and click the reset password link.&nbsp;</p>
          <p>If you are still waiting to receive a forgotten password email, contact one of our support agents to investigate why you cannot register an account with {{{siteName}}}.</p>
          <p><br></p>
          <p>Q: How do I unsubscribe from receiving promotional emails and texts?</p>
          <p>To unsubscribe from communications, go to &quot;My Account&quot; and click &quot;Preferences,&quot; then untick the boxes next to email or sms and click save. Alternatively, you can unsubscribe directly from our promotional emails or sms by clicking on the unsubscribe link.</p>
          <p><br></p>
          <p>Q: How do I close my account?</p>
          <p>A: If you want to take a break and temporarily deactivate your account, you can do so by taking a time-out. After logging in, this option is located in the &quot;Responsible Gaming&quot; section of {{{siteUrl}}}. Here you will find the opportunity to pause your account for the time you deem fit. If you want to close your account for extended periods, contact our support team through {{{supportEmailAddress}}} or our Live Chat.</p>
          <p><br></p>
          <p>Q: I asked a question on live Chat, but I&apos;m left waiting for feedback.</p>
          <p>A: At certain times of the day, many players seek assistance from one of our support agents. Consequently, feedback might take time to deliver. However, our support service runs 24/7, 365 days a year, and be sure that you will get feedback as soon as possible.</p>
          <p><br></p>
          <p><br></p>
          <p>Payments</p>
          <p><br></p>
          <p>Q: How can I deposit money into my account?</p>
          <p>A: To deposit funds, log in to the website and select the &quot;Deposit&quot; option on the left-hand side. Then, choose your preferred payment method and follow the instructions.</p>
          <p><br></p>
          <p>Q: What is the process for making a withdrawal?</p>
          <p>A: When logged in, click on your profile icon on the left-hand side of the webpage. You will then be required to specify the amount of money you want to withdraw from your account and by which preferred payment method.</p>
          <p><br></p>
          <p>Q: Which forms of payment methods do you accept for the deposit?</p>
          <p>A: The deposit methods you can use vary depending on your location. We offer a range of cards, e-wallets, and even cryptocurrencies. To view all the deposit methods available to you, please click here.</p>
          <p><br></p>
          <p>Q: Which forms of withdrawal are available to me?</p>
          <p>A: The type of withdrawal options available to you depends on where you live. We provide various cards, digital wallets, and even cryptocurrency services. To see the complete list, check this page.</p>
          <p><br></p>
          <p>Q: Why didn&apos;t my deposit go through?</p>
          <p>A: Ensure that each field is accurately filled. Be sure you are utilizing the payment methods accepted in your area. For example, failures to deposit money are often caused by an issue with the bank. Be sure you have enough funds in the payment method you selected and that all related security verifications are passed. If you need help, feel free to contact our help desk.</p>
          <p><br></p>
          <p>Q: I deposited money, but the amount needs to be visible in my account. How is this possible?</p>
          <p>A: Check if any money has been taken from your bank account, and let us know if it has. Most issues can be resolved without providing any evidence of payment. However, we may occasionally need proof of payment to look into the problem with the payment processor.</p>
          <p><br></p>
          <p>Q: Are there any charges for depositing or withdrawing money at {{{siteName}}}?</p>
          <p>A: We charge no fees on deposits or withdrawals.</p>
          <p><br></p>
          <p>Q: Why am I unable to withdraw money from my account?</p>
          <p>A: Are you requesting more funds than you have in your account? Do you have any bonus funds that still need to be wagered and, therefore, cannot be withdrawn? Did you refresh the page and clear the cache?</p>
          <p>If the issue continues, please don&apos;t hesitate to contact us, and we will assist you.</p>
          <p><br></p>
          <p>Q: When will I get the funds from my withdrawal?</p>
          <p>A: The time it takes to process your withdrawal request is based on your chosen payment method. For example, if you are using a card, it can take 1-5 business days to be approved and sent, while e-wallets are processed immediately after being confirmed by our payments team.</p>
          <p><br></p>
          <p>Q: Is there a maximum amount I can deposit?</p>
          <p>A: There is no limit on how much money you can deposit daily, weekly, or monthly. However, certain payment providers might impose a daily deposit limit threshold which is out of our control. If you encounter any issues, don&apos;t hesitate to contact one of our support agents to investigate any potential problems further.</p>
          <p><br></p>
          <p>Bonuses</p>
          <p><br></p>
          <p>Q: What must I do to receive the welcome bonus after signing up?</p>
          <p>A: The welcome bonus is automatically issued to your account as soon as you successfully register an account at {{{siteName}}}. You can see your eligible bonus details in the cashier section, accessible by clicking the deposit now button or on the promotions page. Claim the bonus by ticking the box next to it in the cashier or click the claim now button on the relevant promotions page and proceed to deposit. After you successfully deposit, the bonus will be automatically added to your wallet.</p>
          <p><br></p>
          <p>Q: How will I know if I&apos;m eligible for free spins?</p>
          <p>A: After you log in to {{{siteName}}}, go to your profile on the top left of the homepage, click on the bonus section, and there you will see if any free spins are credited to your account.&nbsp;</p>
          <p><br></p>
          <p>Q: Do all games count towards the wagering requirements?</p>
          <p>A: Games can have different contributions to wagering requirements. Some may contribute nothing at all, while others may contribute fully. All the games that do not contribute towards wagering can be viewed on our bonus terms page here.</p>
          <p><br></p>
          <p>Q: How often do I need to wager my bonus before I can cash out?</p>
          <p>A: You need to wager your bonus funds 50 times before being able to withdraw it. This wagering contribution is standard and varies depending on your loyalty level. For more information, visit our loyaly programme page or check our bonus terms page for all details related to wagering requirements for our ten different loyalty levels.</p>
          <p><br></p>
          <p>Responsible Gaming</p>
          <p><br></p>
          <p>Q: Can I limit how much I can play, spend and lose on {{{siteName}}}?</p>
          <p>A: Our responsible gambling department takes our players&apos; needs and safety seriously. That&apos;s why we provide multiple tools to help them manage their gaming experiences &ndash; such as time-out limits and other restrictions. Please let us know if you feel we should develop additional tools to help you control your gambling.&nbsp;</p>
          <p>To limit your gambling, head to our Limits page to set your Deposit Limits for either one week or a month. Or, if you need a quick break from gaming, take a 24-hour, 7-day time-out, or even self-exclude permanently. If you wish assistance from one of our support agents with these responsible gaming options, contact us via email at {{{supportEmailAddress}}} or our 24/7 Live Chat.</p>
          <p><br></p>
          <p>Q: Can I adjust my gaming limits if need be?</p>
          <p>A: If you wish to adjust your limits, you can do so easily. However, increasing your limits will require a 24-hour grace period for the changes to take effect, while decreasing them is immediate.</p>
          <p><br></p>
          <p>Q: If I self-exclude my account, what will happen to the funds in my account?</p>
          <p>A: If you have cash funds remaining in your account after self-exclusion, it&apos;s best to contact our support team for assistance on the next steps. They&apos;ll be happy to provide advice on how to move forward.</p>
          <p><br></p>
          <p>Q: Is it possible to reverse a self-exclusion?</p>
          <p>A: If you&apos;d like to end your self-exclusion period, contact our support team, and they&apos;ll be able to help. Please note that there will be a 24-hour grace period before your account is reactivated.</p>
          <p><br></p>
          <p>Q: If I self-exclude, will my pending withdrawal still be processed?</p>
          <p>A: If you have a pending withdrawal before your self-excluding, it will be processed as usual.</p>
          <p><br></p>
          <p>Q: Can I open another account and start playing again if I&apos;m self-excluded?</p>
          <p>A: No, if you have self-excluded from an account, you cannot open and use another version.</p>
          <p><br></p>
          <p><br></p>
          <p>Technical Issues</p>
          <p><br></p>
          <p>Q: Are games taking forever to load?&nbsp;</p>
          <p>A: Let&apos;s look at why your game(s) might lag and figure out how to get you back in action.</p>
          <p>Ensure that your internet connection is running optimally and free of any issues. Check that you stay within your bandwidth by running fewer programs in the background. Keep your browser up to date with the most current version for maximum performance and security.</p>
          <p><br></p>
          <p>Q: My game got stuck in the middle of a round. What happens now?</p>
          <p>A: No need to be alarmed! You will not lose progress or money if your game gets stuck. Your data will remain intact, and the game will resume right where you left off. So rest assured that your gaming experience will always be safe and uninterrupted.</p>
          <p><br></p>
          <p>Q: One of the games I&apos;m trying to play needs to launch. How can I fix it?</p>
          <p>A: This issue could be due to a lost connection to the server. First, refresh the game or restart your browser for a quick fix. If that doesn&apos;t work, check your internet connection and ensure everything runs smoothly. Then, get back in the game with just a few easy steps!</p>
          <p><br></p>
          <p>Q. I claimed a bonus before I made a deposit, but the funds still need to be credited. What should I do?</p>
          <p>A: If this rare issue happens, contact one of our support agents in live Chat, and after verifying your eligibility, they will manually credit funds directly to your account.</p>
          <p><br></p>
          <p>Q: I received a promotional email saying that I was credited free spins on my favorite game, but when I logged in to play them, they weren&apos;t available.</p>
          <p>A: In such a case, contact one of our customer support agents, who can credit your due spins instantly.</p>
          <p><br></p>
          <p>Security, License, Legal</p>
          <p><br></p>
          <p>Q: Can I trust {{{siteName}}} with my money?</p>
          <p>A: Absolutely! Your funds are safe with {{{siteName}}}. We use the latest security measures to ensure your money is secure and protected. But, of course, being Curacao license holders obliges us to follow regulations and ensure that player funds are safe and accounted for.</p>
          <p>Furthermore, our site is SSL encrypted, giving you the utmost confidence in the security of your data.</p>
          <p><br></p>
          <p>Q: In which jurisdiction is {{{siteName}}} licensed?</p>
          <p>A: We hold a gaming license from Curacao.</p>
          <p><br></p>
          <p>Q: What is the approximate time needed to check my submitted documents?</p>
          <p>A: We will do our best to get your documents processed promptly, yet please bear in mind that your records need, at most, 72 hours to be thoroughly checked by our agents.</p>
          <p><br></p>
          <p>Q: How will I know if my documents have been successfully accepted?</p>
          <p>A: Our support team will send you a confirmation email that your submitted documents have been successfully verified.</p>
          <p><br></p>
          <p>Q: I suspect that someone has excessed my account without my knowledge. What should I do?</p>
          <p>A: If you think your account has been breached, it is essential to reach out to our support team right away, and we can help you fix the issue.</p>
          <p><br></p>
          <p>Q: Do you disclose my information to any other companies?</p>
          <p>A: We may be required by law, regulation, or other legal authority or warrant to disclose your personal information. Additionally, we might also share your data with a regulatory or law enforcement agency if it is deemed necessary for the protection of the Company, its customers, or any third party. Check our Privacy Policy for more detailed information.</p>
          <p><br></p>
          <p><br></p>
          <p><br></p>`
        }),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: JSON.stringify({ EN: 'Privacy Policy' }),
        slug: 'privacy-policy',
        content: JSON.stringify({
          EN: `
          <p><strong>Privacy Policy at {{{siteName}}} Casino</strong></p>
          <p>{{{siteName}}} Casino ("we") are committed to protecting and respecting your privacy.</p>
          <p>This policy (together with Terms and Conditions and any other documents referred to in it) sets out the basis on which any personal data we collect from you, or that you provide to us, will be processed by us. Please read the following carefully to understand our views and practices regarding your personal data and how we will treat it. Be assured that the person(s) with access to your data will keep your information confidential and only access and use information on your account when needed for internal purposes and on a need-to-know basis only.</p>

          <p><strong>Information we may collect from you</strong><br>We may collect and process the following data about you:</p>
          <p><ul><li><p>Information that you provide by filling in forms on our website {{{siteUrl}}} (the "Website"). This includes information provided at the time of opening an account with us, depositing funds, playing or participating in the games, events and services on the Website, posting material or requesting services or information. We also ask for a copy of yor ID, passport or drivers license.</p>
          <li><p>Details of your visits to the Website, including, but not limited to, your betting and gaming activities, the resources that you access, traffic data, location data and communication data, whether this is required for our own accounting purposes, risk assessment, security reviews, compliance procedures or otherwise.</p>
          <li><p>Details of transactions you carry out through your account with us.</p></ul></p>
          <p>If you contact us, we may keep a record of that correspondence. We or one of our licensors or suppliers may also ask you to complete surveys that we use for research purposes, although you do not have to respond to them.</p>

          <p><strong>IP Addresses and Cookies</strong><br>We may collect information about your computer, including where available your IP address, operating system and browser type, for system administration and to report aggregate information to our advertisers and licensors. This is statistical data about our users' browsing actions and patterns, and does not identify any individual.</p>
          <p>For the same reason as above, we may obtain information about your general internet usage by using a cookie file which is stored on the hard drive of your computer. Cookies contain information that is transferred to your computer's hard drive. They help us to improve the Website and to deliver a better and more personalised service. They enable us to estimate our audience size and usage pattern, to store information about your preferences, such as language and odds type, and to recognise you when you return to the Website. While placing a bet, information will be temporarily stored in a cookie until the transaction has been completed.</p>
          <p>You may refuse to accept cookies by activating the setting on your browser which allows you to refuse the setting of cookies. However, if you select this setting you may be unable to access certain parts of the Website. Unless you have adjusted your browser setting so that it will refuse cookies, our system will issue cookies when you log on to the Website.</p>

          <p><strong>Where we store your personal data</strong><br>The data that we collect from you may be transferred to, and stored at, a destination outside the European Economic Area ("EEA"). It may also be processed by staff operating outside the EEA who work for us or for one of our suppliers or licensors. Such staff maybe engaged in, among other things, the processing of your payment details and the provision of support services. By submitting your personal data, you agree to this transfer, storing or processing. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this privacy policy.</p>
          <p>All information you submit to us is stored and kept on secure servers. Any payment transactions and submissions of personal information is transmitted using SSL encryption technology.<br><br>Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our utmost to protect your personal data, we cannot guarantee the security of your data transmitted to the Website; any transmission is at your own risk. Once we have received your information, we will use strict procedures and security features to try to prevent unauthorised access.</p>

          <p><strong>Uses made of the information</strong><br>We use information held about you in the following ways:</p>

          <p><ul><li><p>To ensure that content from the Website is presented in the most effective manner for you and for your computer.</p>
          <li><p>To provide you with information, products, games or services that you request from us or which we feel may interest you.</p>
          <li><p>To carry out our obligations arising from any transactions entered into between you and us.</p>
          <li><p>To allow you to participate in the interactive features of our games and services.
          <li>To notify you about changes to our games and services.</p></ul>
          We may also permit selected third parties to use your data to provide you with information about games, goods and services which may be of interest to you.</p>

          <p><strong>Disclosure of your information</strong><br>We may disclose your personal information to any member of our group, which means our subsidiaries, our ultimate holding company and its subsidiaries.</p>

          <p>We may disclose your personal information to third parties:<br>
          <ul><li><p>In the event that we sell or buy any business or assets, in which case we may disclose your personal data to the prospective seller or buyer of such business or assets.</p>
          <li><p>If {{{siteName}}} Casino or substantially all of its assets are acquired by a third party, in which case personal data held by it about its customers will be one of the transferred assets.</p>
          <li><p>If we are under a duty to disclose or share your personal data in order to comply with any legal obligation, or in order to enforce or apply the {{{siteName}}} Casino Terms of Website Use or the {{{siteName}}} Casino Betting and Gaming Terms and Conditions or to protect the rights, property, or safety of {{{siteName}}} Casino, our customers, licensors or others. This includes exchanging information with other companies and organisations for the purposes of fraud protection and credit risk reduction.</p></ul></p>
          <p>We will disclose any information to the LGA and to any other authority in case of fraudulent activities or inquest from the relevant authorities.</p>

          <p><strong>Your Rights</strong><br>You have the right to ask us not to process your personal data for marketing purposes. We will usually inform you (before collecting your data) if we intend to use your data for such purposes or if we intend to disclose your information to any third party for such purposes. You can exercise your right to prevent such processing by checking certain boxes on the forms we use to collect your data. You can also exercise the right at any time by contacting us at {{{siteName}}} Casino.</p>
          <p>The Website may, from time to time, contain links to and from the websites of our partner networks, advertisers and affiliates. If you follow a link to any of these websites, please note that these websites have their own privacy policies and that we do not accept any responsibility or liability for these policies. Please check these policies before you submit any personal data to these websites.</p>
          `
        }),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: JSON.stringify({ EN: 'Bonus Terms' }),
        slug: 'bonus-terms',
        content: JSON.stringify({
          EN: `
          <p><h3>1. General Bonus Terms Conditions</h3></p>
<p><b>1.1.</b>&nbsp;{{{siteName}}} occasionally offer bonuses, rewards, promotions, competitions, cashback, and/or gifts (&ldquo;promotions&rdquo;). These promotions will be governed by these General Bonus Terms and Conditions (&ldquo;General Bonus T&amp;Cs&apos;&apos;). Each promotion will have its own specific terms and conditions outside the General Bonus Terms and Conditions. By participating in any promotion and agreeing to receive bonuses offered by {{{siteName}}} CASINO, you automatically consent to comply with our general bonus terms &amp; conditions.</p>
<p><b>1.2.</b>&nbsp;If you intend to participate in a promotion or receive some bonus offered by {{{siteName}}} CASINO but do not properly understand how the promotion/bonus works, you should contact {{{siteName}}} CASINO Customer support for clarification.</p>
<p><b>1.3.</b>&nbsp;{{{siteName}}} CASINO reserves the right to add, remove or alter any promotional/bonus details or terms.</p>
<p><b>1.4.</b>&nbsp;You must regularly check the bonus terms and conditions for any amendments or updates. In case any alterations in terms and conditions occur, be it the general Terms and Conditions or the terms of a specific promotion, {{{siteName}}} CASINO will inform you accordingly.</p>
<p><b>1.5.</b>&nbsp;We may make terms and conditions available in various languages for our customer&rsquo;s convenience. In case of any discrepancy between the English and non-English versions of these terms and conditions, the English version always takes priority.</p>
<p><b>1.6.</b>&nbsp;Offers are limited to one Offer per Player (one Offer per household address, shared computer or shared IP address, email address, telephone number, and payment method). {{{siteName}}} CASINO reserves the right to suspend or close any account suspected of being a duplicate. If applicable, the original deposit made by the Player will not be confiscated, and only the Bonus and/or winnings from the Bonus will be confiscated.</p>
<p><b>1.7.</b>&nbsp;Unless otherwise stated, active Bonuses must be wagered within 7 days of issue. Otherwise, both bonus funds &amp; winnings associated with the relevant bonus will be forfeited.</p>
<p><b>1.8.</b>&nbsp;The availability of bonuses (bonuses) on the Site for a particular player is based exceptionally on its presence in the player&rsquo;s profile. If any of the bonuses are not intended for the player, then such a bonus will not be displayed among those available in the profile. Bonus offers may be received via email, SMS or other ways of communication. Those bonuses (along with the winnings from them) that are not intended for the player - may be forfeited.<br></p>
<p><b>1.9.</b>&nbsp;Real balance is used for bets first. Only when the amount on the player&apos;s real balance equals zero he starts playing for bonus money.</p>
<p><b>1.10.</b>&nbsp;Bonus amounts credited to a player&apos;s bonus account are subject to a maximum of fifty (x50) times wagering requirements before they are converted to your Cash Balance and can be withdrawn (unless explicitly stated otherwise in the Significant Terms).&nbsp;</p>
<p>Wagering requirements vary depending on the loyalty level of the customer.<br><br>Please see the table below showing the bonus wagering requirement by player level status:<br><br></p>
<style>
table {
border: 1px solid black;
border-collapse: collapse;
}
td, th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}
</style>
<div align="left">
    <table>
        <tbody>
            <tr>
                <th>
                    <p>Loyalty Levels</p>
                </th>
                <th>
                    <p>Bonuses Wagering Requirements</p>
                </th>
            </tr>
            <tr>
                <td>
                    <p>1</p>
                </td>
                <td>
                    <p>50x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>2</p>
                </td>
                <td>
                    <p>45x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>3</p>
                </td>
                <td>
                    <p>40x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>4</p>
                </td>
                <td>
                    <p>35x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>5</p>
                </td>
                <td>
                    <p>30x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>6</p>
                </td>
                <td>
                    <p>25x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>7</p>
                </td>
                <td>
                    <p>20x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>8</p>
                </td>
                <td>
                    <p>15x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>9</p>
                </td>
                <td>
                    <p>15x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>10</p>
                </td>
                <td>
                    <p>10x</p>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<p><br></p>
<p><b>1.11.</b>&nbsp;If you have decided not to participate in a promotion(s), you have already opted in. You must contact {{{siteName}}} CASINO Customer support and request cancellation of the bonus before placing any bets.</p>
<p><b>1.12.</b>&nbsp;Unless otherwise stated, 10 EUR, INR 1000, USD 10, JPY 1500, NZD 10, AUD 10, TRY 200,, CAD 10, NOK 100, PLN 50, HUF 4000 (or the equivalent in any other currency) is the minimum deposit to avail of promotions or bonuses.</p>
<p><b>1.13.</b>&nbsp;You may not place any bets that exceed the maximum bonus bet size when using bonus money. The maximum bonus bet size is 5 EUR, INR 500, USD 5, JPY 750, NZD 5, AUD 5, TRY 100, CAD 5, NOK 50, PLN 25, HUF 2000 (or equivalent in any other currency) per bet/spin or equivalent unless it is stated differently in the specific terms and conditions tailored to each bonus campaign. Please note that you are responsible for ensuring you know the maximum bonus bet size. For cases where bets are deemed to have exceeded the maximum bonus bet size, an account may be reviewed, and the bonus funds confiscated and winnings, if any, voided.</p>
<p><b>1.14.</b>&nbsp;If you wish to withdraw before meeting the Wagering Requirements after you start to wager bonus money, you will effectively forfeit your bonus winnings accrued and your bonus amount and opt out of the promotion.</p>
<p><b>1.15.</b>&nbsp;Any Bonus Funds are displayed separately from any Deposit Funds in Your Player Account. Bonus Funds can only be withdrawn once converted into real money.</p>
<p><b>1.16.</b>&nbsp;When playing an active bonus, your funds will be used in the following order: Funds required to trigger the bonus, Bonus funds, and Any remaining funds.</p>
<p><b>1.17.</b>&nbsp;You can withdraw real money balance before satisfying bonus wagering. By doing so, you will forfeit the funds in your bonus balance.</p>
<p><b>1.18.</b>&nbsp;If you run out of deposit money and the bonus money attached to it before fulfilling the wagering requirements, your account will be cleared from any remaining wagering requirements.</p>
<p><b>1.19.</b>&nbsp;After wagering requirements are met, the deposit funds, bonus money, and any winnings gained will become withdrawable as real-cash money in your account.</p>
<p><b>1.20.</b>&nbsp;{{{siteName}}} CASINO bonuses are intended for recreational playing only. Improper use of the bonuses and promotional abuse will not be tolerated. We reserve the right to take the following actions against bonus abuse (list not exhaustive).</p>
<ul>
    <li>
        <p>Revoke and/or cancel any Bonuses and Bonus winnings that we regard to have been gained by misuse of the system.</p>
    </li>
    <li>
        <p>Ban such players from receiving further Bonuses</p>
    </li>
    <li>
        <p>Close the account</p>
    </li>
</ul>
<p>Abuse may include but is not limited to</p>
<ul>
    <li>
        <p>Using multiple Account(s)</p>
    </li>
    <li>
        <p>Evidence that an offer is being claimed or benefits the same person or group of persons, acting in an attempt to defraud us.</p>
    </li>
    <li>
        <p>Wagering bonuses on excluded Games.</p>
    </li>
    <li>
        <p>Co-operation, collusion, or organization of bets from the same source</p>
    </li>
    <li>
        <p>Manipulation of software, exploitation of loopholes, or other behaviors which amount to deliberate cheating.</p>
    </li>
    <li>
        <p>Hiding IP addresses or using a VPN(s).</p>
    </li>
    <li>
        <p>Delaying game rounds in any game, including free spins and bonus features, to a later time when you have wagering and non-wagering requirements.</p>
    </li>
    <li>
        <p>Using strategies that take advantage of any software bug or failure or on the built-up value during real-money play.</p>
    </li>
</ul>
<p><b>1.21.</b>&nbsp;We may reclaim any Bonus that has been awarded in error in accordance with the General Terms and Conditions.</p>
<p><b>1.22.</b>&nbsp;We may make amendments to an Offer to correct typographical errors or improve understanding, and we reserve the right to amend or terminate an offer if required for legal and/or regulatory reasons.</p>
<p><b>1.23.</b>&nbsp;{{{siteName}}} CASINO reserves the right to ban a player from participating in promotions at any time without the obligation to provide any reasons behind such a decision.</p>
<p><b>1.24.</b>&nbsp;If you failed to claim a deposit bonus or forgot to do so and intend to play with the bonus, you must contact Customer support before placing any bets and ask to adjust your balance.</p>
<p><b>1.25.</b>&nbsp;We reserve the right to audit your game play/transaction logs. You hereby consent in advance for us to do so. If, after an audit, it transpires that you participated, or attempted to participate, in a manipulative game strategy to take advantage of the bonus being rewarded to you from the casino, we hold the right to deny, withhold, revoke, or withdraw your entitlement to any promotion, winnings or bonus, or terminate your association with our website and/or block your account. In such circumstances, we shall be under no obligation to refund any funds in your account other than your original deposit amount.</p>
<p><b>1.26.</b>&nbsp;Bonus money is free money intended to help you enjoy {{{siteName}}} CASINO ; it is not to be withdrawn once received. To prevent you from withdrawing your bonus funds instantly, {{{siteName}}} CASINO (as well as other casinos) requires so-called &ldquo;wagering&rdquo; of the bonus money. The wagering coefficient indicates the number of times you need to place the bonus amount.</p>
<p><b>1.27.</b>&nbsp;Participation in some promotions requires players to claim the bonus from the promotions page or cashier before depositing funds. You can also opt out of receiving promotional newsletters anytime by unsubscribing directly from the email/SMS link or directly from your profile section at {{{siteUrl}}} after you log in.</p>
<p><b>1.28.</b>&nbsp;Bonus is in effect until bonus wagering requirements are fulfilled, all bonus money is lost, or the bonus expires.</p>
<p><b>1.29.</b>&nbsp;Any deposit bonus offered has a max cash-out policy which varies according to the loyalty program level the players are in. These max cash-out limits are also applicable to the welcome offers and can be viewed below:<br><br></p>
<div align="left">
    <table>
        <tbody>
            <tr>
                <th>
                    <p>Loyalty Levels</p>
                </th>
                <th>
                    <p>Max Cashout with Deposit Bonus</p>
                </th>
            </tr>
            <tr>
                <td>
                    <p>1</p>
                </td>
                <td>
                    <p>EUR 1000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>2</p>
                </td>
                <td>
                    <p>EUR 2000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>3</p>
                </td>
                <td>
                    <p>EUR 3000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>4</p>
                </td>
                <td>
                    <p>EUR 4000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>5</p>
                </td>
                <td>
                    <p>EUR 5000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>6</p>
                </td>
                <td>
                    <p>EUR 6000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>7</p>
                </td>
                <td>
                    <p>EUR 10000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>8</p>
                </td>
                <td>
                    <p>EUR 15000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>9</p>
                </td>
                <td>
                    <p>EUR 15000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>10</p>
                </td>
                <td>
                    <p>EUR 25000</p>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<p><br></p>
<p><br></p>
<p><b>1.30.</b>&nbsp;Game winnings from spins or game rounds initiated with bonus funds but completed with real money after the bonus has been wagered, lost, or forfeited will be removed and may result in your account being closed for bonus abuse.</p>
<p><b>1.31.</b>&nbsp;We reserve the right to withdraw or suspend any promotion or campaign at any given time.</p>
<p><b>1.32.</b>&nbsp;We reserve the right to update the bonus terms and conditions at anytime.</p>
<p>&nbsp;</p>
<h3>2. Specific promotions</h3>
<p><br><b>2.1. Deposit Free Spins</b><br><br>For free spins credited with a deposit, the maximum winning withdrawal cap is 500 EUR (or the equivalent in any other currency). &nbsp;The highest wagering requirement for deposit-free spins is 50x the winning amount, but this varies depending on the player&rsquo;s loyalty program level, as shown below.</p>
<div align="left">
    <table>
        <tbody>
            <tr>
                <th>
                    <p>Loyalty Levels</p>
                </th>
                <th>
                    <p>FS Wagering</p>
                </th>
            </tr>
            <tr>
                <td>
                    <p>1</p>
                </td>
                <td>
                    <p>50x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>2</p>
                </td>
                <td>
                    <p>45x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>3</p>
                </td>
                <td>
                    <p>40x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>4</p>
                </td>
                <td>
                    <p>35x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>5</p>
                </td>
                <td>
                    <p>30x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>6</p>
                </td>
                <td>
                    <p>25x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>7</p>
                </td>
                <td>
                    <p>20x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>8</p>
                </td>
                <td>
                    <p>15x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>9</p>
                </td>
                <td>
                    <p>15x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>10</p>
                </td>
                <td>
                    <p>10x</p>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<p><br><br></p>
<p><b>2.2. No Deposit-Free Spins</b><br><br>For free Spins credited without needing a deposit, unless differently specified in the specific promotion, the maximum winning withdrawal cap is 50 EUR (or the equivalent in any other currency). Winnings will be transferred to your cash account after wagering 100x the winning amount generated from the spins is complete. Unless otherwise stated, to withdraw winnings from free spins, you must deposit a minimum of 10 EUR (or the equivalent in any other currency) and wager it once 1x.<br><br></p>
<p><b>2.3.&nbsp;Daily Cashback</b><br></p>
<p>2.3.1 Cashback is calculated daily on all deposits between 00:01 - 23:59 CET.</p>
<p>2.3.2 Cashback is calculated as follows: Deposits - Withdrawals - Bonus Received - Balance.</p>
<p>2.3.3 Balance will be checked the following morning at 06:00 CET, and players must have a balance of not more than &euro;5 to qualify for cashback.<br><br>2.3.4 Cash back bonuses are automatically available to all players from level 2 upwards.</p>
<p>2.3.5 Cashback will be credited to qualifying players by 12:00 CET the following morning.</p>
<p>2.3.6 Cash Back credits will be rounded to the nearest Euro or currency equivalent.</p>
<p>2.3.7 Cashback will be credited to your bonus wallet and is subject to varying wagering requirements depending on the player&rsquo;s Loyalty level status.<br><br>See the table below for the different wagering requirements by player loyalty level:</p>
<p><br></p>
<div align="left">
    <table>
        <tbody>
            <tr>
                <th>
                    <p>Loyalty Levels</p>
                </th>
                <th>
                    <p>Cashback Wagering Requirment</p>
                </th>
            </tr>
            <tr>
                <td>
                    <p>1</p>
                </td>
                <td>
                    <p>N/A</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>2</p>
                </td>
                <td>
                    <p>50x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>3</p>
                </td>
                <td>
                    <p>40x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>4</p>
                </td>
                <td>
                    <p>35x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>5</p>
                </td>
                <td>
                    <p>30x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>6</p>
                </td>
                <td>
                    <p>20x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>7</p>
                </td>
                <td>
                    <p>15x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>8</p>
                </td>
                <td>
                    <p>10x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>9</p>
                </td>
                <td>
                    <p>5x</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>10</p>
                </td>
                <td>
                    <p>1x</p>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<p><br><br></p>
<p>2.3.8 If you have real money and cashback money in your account, the real money will always be used first and then cashback money.</p>
<p>2.3.9 Cashback is only paid to open accounts.</p>
<p>2.3.10 {{{siteName}}} reserves the right to decline cashback to any players who are found to abuse the cashback offer due to strategic gameplay. For example, using the game feature, leaving the value in the game, and redeeming it the day after when cashback has been credited. This is prohibited and considered fraudulent. Any cashback and associated winnings will be confiscated. The cashback is subject to standard bonus terms and conditions. {{{siteName}}} reserves the right to cancel or change the cashback offer at any time, at its sole discretion.</p>
<p></p>
<p><br>2.3.11.&nbsp;The daily cashback percentage issued depends on the player&rsquo;s loyalty level, as indicated below. The minimum cashback claimed is 3%, and the maximum is 15%.</p>
<div align="left">
    <table>
        <tbody>
            <tr>
                <th>
                    <p>Loyalty Levels</p>
                </th>
                <th>
                    <p>CB Percentage</p>
                </th>
            </tr>
            <tr>
                <td>
                    <p>1</p>
                </td>
                <td>
                    <p>0</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>2</p>
                </td>
                <td>
                    <p>3%</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>3</p>
                </td>
                <td>
                    <p>4%</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>4</p>
                </td>
                <td>
                    <p>6%</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>5</p>
                </td>
                <td>
                    <p>7%</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>6</p>
                </td>
                <td>
                    <p>8%</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>7</p>
                </td>
                <td>
                    <p>9%</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>8</p>
                </td>
                <td>
                    <p>10%</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>9</p>
                </td>
                <td>
                    <p>12%</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>10</p>
                </td>
                <td>
                    <p>15%</p>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<p>2.3.12 The daily cashback program has a minimum and maximum cash-out policy based on the player&rsquo;s loyalty levels. Money over and above the maximum cashable amounts will be automatically removed from the player&rsquo;s wallet. The minimum cashback awarded is &euro;0.5, and the maximum awarded cashback is &euro;1000 daily.<br><br>See the table below for cashback maximum withdrawal amounts per level.&nbsp;</p>

<div align="left">
    <table>
        <tbody>
            <tr>
                <th>
                    <p>Loyalty Levels</p>
                </th>
                <th>
                    <p>Cashback Maximum Cash Out</p>
                </th>
            </tr>
            <tr>
                <td>
                    <p>1</p>
                </td>
                <td>
                    <p>N/A</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>2</p>
                </td>
                <td>
                    <p>&euro;500</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>3</p>
                </td>
                <td>
                    <p>&euro;600</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>4</p>
                </td>
                <td>
                    <p>&euro;700</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>5</p>
                </td>
                <td>
                    <p>&euro;800</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>6</p>
                </td>
                <td>
                    <p>&euro;1,000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>7</p>
                </td>
                <td>
                    <p>&euro;1,500</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>8</p>
                </td>
                <td>
                    <p>&euro;2,000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>9</p>
                </td>
                <td>
                    <p>&euro;2,500</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>10</p>
                </td>
                <td>
                    <p>&euro;5,000</p>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<p><br></p>
<p>2.3.13 The cashback bonus must be cleared (wagered) in 1 day from the issue date. Failing to claim or complete wagering will result in bonus cancellation and voiding of the unwaged balance.</p>
<p><br></p>

<p><b>2.4.&nbsp;Instant &amp; Good Will Bonuses</b></p>
<p>2.4.1. Support agents might consider awarding an instant deposit bonus, deposit bonus spins, free spins, free bonus money, or free cash as an act of goodwill in a case-by-case scenario. In such cases and independently of the type or amount of bonus given, the maximum win resulting from that bonus cannot exceed 4 times the value of the originally released bonus amount.</p>
<p>2.4.2. You can apply for reload bonuses only if you have no pending withdrawal.</p>
<p>2.4.3. Unless stated in the individual promotional terms, the general bonus terms shall apply to all reload bonuses.<br><br></p>
<p><b>2.5.&nbsp;Welcome Offers</b></p>
<p>2.5.1. The welcome bonus is offered on the first 3 deposits ever made by players and is split into 3 deposit bonuses:</p>
<p><b>The first welcome bonus</b>&nbsp;is a deposit bonus of 100% up to 500 EUR, INR 45000, USD 500, JPY 75000, NZD 500, AUD 500, TRY 10000, CAD 10, NOK 5000, PLN 2500, HUF 200000 &nbsp;( equivalent in any other currency) + 200 Spins on Big Bass Bonanza.</p>
<p><b>The second welcome bonus</b>&nbsp;is a deposit bonus of 75% up to 500 EUR, INR 45000, USD 500, JPY 75000, NZD 500, AUD 500, TRY 10000, CAD 10, NOK 5000, PLN 2500, HUF 200000 &nbsp;( equivalent in any other currency) + 100 Spins in Gates of Olympus.</p>
<p><b>The third welcome bonus</b>&nbsp;is a deposit bonus of 100% up to 1000 EUR, INR 90000, USD 1000, JPY 150000, NZD 1000, AUD 1000, TRY 20000, CAD 1000, NOK 10000, PLN 5000, HUF 400000 &nbsp;( equivalent in any other currency) (equivalent in any other currency) + 50 Spins in Jammin Jars.</p>
<p>2.5.2. Welcome package also includes Free spins offered with the first, second, and third deposits made by players.&nbsp;</p>
<p>They are split as follows:</p>
<p><b>Welcome Free Spins part 1</b>: 200 Free Spins are distributed in the player&rsquo;s account in batches of 20 in 10 consecutive days. The initial 20 free spins are available when the player makes the first deposit and claims the welcome bonus.<br><br><b>Welcome Free Spins part 2</b>: &nbsp;100 Free Spins will be distributed to the player&rsquo;s account in batches of 20 in 5 days consecutive days. The initial 20 free spins are available when the player deposits and claims the second welcome bonus.<br><br><b>Welcome Free Spins part 3</b>: &nbsp;50 Free Spins will automatically be credited to the player&rsquo;s account with the third deposit after the third welcome bonus is claimed.&nbsp;</p>
<p><br></p>
<p>2.5.3. It&apos;s important to note that players might see and claim a welcome bonus different from the standard offer advertised on-site. Generally, these welcome bonuses are promoted by affiliate sites with tgt permission. If players claim such 1st deposit offers, they are not permitted to claim a second first deposit offer from other site sections. If this is discovered or allowed by a system glitch, the Casino reserves the right to close the player&apos;s account immediately.<br><br></p>
<p><b>2.6.&nbsp;Monday 25% Unlimited Bonus</b></p>
<p>2.6.1. The Monday bonus is triggered with a minimum deposit of 10 EUR, INR 1000, USD 10, JPY 1500, NZD 10, AUD 10, TRY 200, CAD 10, NOK 100, PLN 50, and HUF 4000.&nbsp;</p>
<p>2.6.2. Players must go to the cashier or promotions page, claim from there, and then deposit to get the bonus credited to their account.</p>
<p>2.6.3. This deposit bonus can be claimed unlimited times during the day.&nbsp;</p>
<p>2.6.4. Any deposit bonus offered has a max cash-out policy which varies according to the loyalty program level the players are in. These max cash-out limits are also applicable to the welcome offers and can be viewed below:</p>
<p><br></p>
<div align="left">
    <table>
        <tbody>
            <tr>
                <th>
                    <p>Loyalty Levels</p>
                </th>
                <th>
                    <p>Max Cashout with deposit Bonus</p>
                </th>
            </tr>
            <tr>
                <td>
                    <p>1</p>
                </td>
                <td>
                    <p>EUR 1000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>2</p>
                </td>
                <td>
                    <p>EUR 2000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>3</p>
                </td>
                <td>
                    <p>EUR 3000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>4</p>
                </td>
                <td>
                    <p>EUR 4000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>5</p>
                </td>
                <td>
                    <p>EUR 5000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>6</p>
                </td>
                <td>
                    <p>EUR 6000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>7</p>
                </td>
                <td>
                    <p>EUR 10000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>8</p>
                </td>
                <td>
                    <p>EUR 15000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>9</p>
                </td>
                <td>
                    <p>EUR 15000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>10</p>
                </td>
                <td>
                    <p>EUR 25000</p>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<p><br></p>
<p>2.6.5. Wagering Requirement: 50x wagering applies independently of the loyalty program level the player is in.&nbsp;</p>
<p>2.6.6 Max bet during bonus: 5 EUR, INR 500, USD 5, JPY 750, NZD 5, AUD 5, TRY 100, CAD 5, NOK 50, PLN 25, HUF 2000 (or equivalent in any other currency) per bet/spin.</p>
<p>2.6.7. Once claimed, the bonus must be wagered within 7 days from the bonus issue date.<br><br></p>
<p>2.6.8. Standard bonus terms and General Website conditions apply.</p>
<p><br></p>
<p><b>2.7.Tuesday Free Spins Bonus</b></p>
<p>2.7.1. 25 Free Spins bonus is triggered with a minimum deposit of 10 EUR, INR 1000, USD 10, JPY 1500, NZD 10, AUD 10, TRY 200, CAD 10, NOK 100, PLN 50, HUF 4000.<br><br>2.7.2 To claim the 25 free spins credited on the selected game of the week, players need to go to the cashier or promotions page, claim from there, and proceed to deposit. Free spins bonus is offered weekly and subject to standard bonus terms.<br><br></p>
<p>2.7.3. This Offer is available to all players who have already deposited at {{{siteName}}} Casino.</p>
<p>2.7.4. The 25 free spins will be credited into the player&apos;s account instantly upon making a qualifying deposit.</p>
<ul>
    <li>
        <p>Max withdrawal amount with this bonus: 500 EUR, INR 45000, USD 500, JPY 75000, NZD 500, AUD 500, TRY 10000, CAD 10, NOK 5000, PLN 2500, HUF 200000 &nbsp;( equivalent in any other currency).</p>
    </li>
    <li>
        <p>Max bet during bonus: 5 EUR, INR 500, USD 5, JPY 750, NZD 5, AUD 5, TRY 100, CAD 5, NOK 50, PLN 25, HUF 2000 (or equivalent in any other currency) per bet/spin.</p>
    </li>
    <li>
        <p>Wagering Requirement: 50x wagering applies independently of the loyalty program level the player is in.&nbsp;</p>
    </li>
    <li>
        <p>Once claimed, the bonus must be wagered within 7 days from the bonus issue date.</p>
    </li>
</ul>
<p><br></p>
<p><b>2.8. Wednesday double loyalty points bonus</b></p>
<p>2.8.1. The Wednesday double loyalty points grant twice the loyalty points to any player playing at the casino every Wednesday.</p>
<p>For example, if a Player usually receives 1 lp for every 10 EUR, INR 1000, USD 10, JPY 1500, NZD 10, AUD 10, TRY 200, CAD 10, NOK 100, PLN 50, HUF 4000 bet placed on Wednesday, they will receive 2 lp, thus speeding up their level-up potential.</p>
<p><br><b>2.9. Thursday deposit Bonus&nbsp;</b></p>
<p>2.9.1. The 50% up to 50 EUR, INR 5000, USD 50, JPY 7500, NZD 50, AUD 50, TRY 1000, CAD 50, NOK 500, PLN 250, HUF 20000 Thursday bonus is triggered with a minimum deposit of 10 EUR, INR 1000, USD 10, JPY 1500, NZD 10, AUD 10, TRY 200,, CAD 10, NOK 100, PLN 50, HUF 4000.</p>
<p>2.9.2. Players must go to the cashier or promotions page to claim the Thursday bonus, claim from there, and deposit.&nbsp;<br><br><br>2.9.3. To claim the 50% up to 50 EUR, INR 5000, USD 50, JPY 7500, NZD 50, AUD 50, TRY 1000, CAD 50, NOK 500, PLN 250, HUF 20000, players need to go to the cashier or promotions page, claim from there, and proceed to deposit. This deposit bonus is offered weekly and subject to standard bonus terms.</p>
<p>2.9.4. This Offer is available to all players who have already deposited at {{{siteName}}} Casino.</p>
<p>2.9.5. Any deposit bonus offered has a max cash-out policy which varies according to the loyalty program level the players are in. These max cash-out limits are also applicable to the welcome offers and can be viewed below:</p>
<p><br></p>
<p><br></p>
<div align="center">
    <table>
        <tbody>
            <tr>
                <td>
                    <p>Loyalty Levels</p>
                </td>
                <td>
                    <p>Max Cashout with deposit Bonus</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>1</p>
                </td>
                <td>
                    <p>EUR 1000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>2</p>
                </td>
                <td>
                    <p>EUR 2000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>3</p>
                </td>
                <td>
                    <p>EUR 3000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>4</p>
                </td>
                <td>
                    <p>EUR 4000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>5</p>
                </td>
                <td>
                    <p>EUR 5000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>6</p>
                </td>
                <td>
                    <p>EUR 6000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>7</p>
                </td>
                <td>
                    <p>EUR 10000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>8</p>
                </td>
                <td>
                    <p>EUR 15000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>9</p>
                </td>
                <td>
                    <p>EUR 15000</p>
                </td>
            </tr>
            <tr>
                <td>
                    <p>10</p>
                </td>
                <td>
                    <p>EUR 25000</p>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<p><br></p>
<ul>
    <li>
        <p>Max bet during bonus: is 5 EUR, INR 500, USD 5, JPY 750, NZD 5, AUD 5, TRY 100, CAD 5, NOK 50, PLN 25, HUF 2000 (or equivalent in any other currency) per bet/spin.</p>
    </li>
    <li>
        <p>Wagering Requirement: 50x wagering applies independently of the loyalty program level the player is in.&nbsp;</p>
    </li>
    <li>
        <p>Once claimed, the bonus must be wagered within 7 days from the bonus issue date.</p>
    </li>
    <li>
        <p>Standard bonus terms and General Website conditions apply.</p>
    </li>
</ul>
<p><br></p>
<h3>3.0 Other bonus terms<br><br></h3>
<p>3.0.1.&nbsp;Different games and game types contribute towards fulfilling wagering requirements to different extents. For instance, if a game type delivers 100% towards wagering, it means that if you bet &euro;1, &euro;1 will count towards completing the wagering.</p>
<p>Below are the game&apos;s bonus wagering contribution rates:</p>
<p>All Slot Games: 100% (except Amatic: Aztec Emerald, Fruit Loop, Scarab Treasure, Princess of Pearls, Wild Hearts<br><br></p>
<p>- BGaming:&nbsp;Rocket Dice, Blackjack Surrender, Foxy Wild Heart, Plinko, WBC RIng of Riches, Zorro Wild Heart<br><br></p>
<p>- Booming:&nbsp;Surfin&apos; Reels , Wombaroo<br><br></p>
<p>- Betsoft:&nbsp;Dr. Jekyll &amp; Mr. Hyde, Fruitbat Crazy, Max Quest: Wrath of Ra, Lava Gold, Pinocchio, Spinfinity Man, Split Way Royal, Sugar Pop, Sugar Pop 2: Double Dipped, Super 7 Blackjack, Take The Bank, Take The Kingdom, Take Olympus, Take Santa&apos;s Shop, Tens or Better, The Hive!, The Mystic Hive, Three Card Rummy, Triple Edge Poker, Vip European Roulette, WhoSpunIt Plus, Zoom Roulette<br><br></p>
<p>- Endorphina:&nbsp;Ninja<br><br></p>
<p>- Epic Media:&nbsp;1429 Uncharted Seas (TK), Hope Diamond (Blueprint)<br><br></p>
<p>- Evoplay:&nbsp;Fluffy Rangers, Forgotten Fable, Rocket Stars, Night of the Living Tales<br><br></p>
<p>- Felix Gaming:&nbsp;Deep Blue Jackbomb, Lines of Magic<br><br></p>
<p>- Habanero:&nbsp;Egyptian Dreams Deluxe, Candy Tower, Fly!, Jellyfish Flow, Knockout Football, Knockout Football Rush, London Hunter, Magic Oak, Marvelous Furlongs, Presto!, Pumpkin Patch, Santa&rsquo;s Village<br><br></p>
<p>- iSoftbet:&nbsp;Ambiance, Mega Boy, Roo Riches, Super Fast Hot Hot Respin, Tree of Fortune, Vegas High Roller<br><br></p>
<p>- Kalamba:&nbsp;Bangkok Dreams, Crystal Cavern, Dino Odyssey<br><br></p>
<p>- Mascot:&nbsp;Bastet and Cats<br><br></p>
<p>- NetEnt:&nbsp;Blood Suckers, Dead or Alive, Dead or Alive 2, Dead or Alive 2 Feature Buy, Devil&apos;s Delight, Jackpot 6000, Lucky Angler, Mega Joker, Reel Rush 2, Reel Steal, Robin Hood: Shifting Riches, Scudamore&apos;s Super Stakes, Secrets of Atlantis, Serengeti Kings, Single Deck Blackjack Professional Series, Street Fighter II: The World Warrior Slot, The French Roulette, Rome: The Golden Age, The Wish Master, TXS Hold&apos;em Professional Series, Wilderland<br><br></p>
<p>- Nolimit City:&nbsp;Book Of Shadows<br>Nucleus: Wild Cherry Blast, Wins Ahoy<br><br></p>
<p>- NYX:&nbsp;300 Shields, Jackpot Jester 200000, 1429 Uncharted Seas , Lil Devil (BTG), Royal Mint (BTG)<br><br></p>
<p>- OnlyPlay:&nbsp;Crystal Crush, Juicy Crush, Myths of Bastet<br><br></p>
<p>- Play&apos;nGo: Baker&apos;s Treat, Eye of the Kraken, Golden Legend, Happy Halloween, Hugo 2, Mahjong 88, MULTIFRUIT 81, Pearls of India, Pimped, Rage to Riches, Royal Masquerade, Sea Hunter, Tower Quest<br><br></p>
<p>- Playson:&nbsp;Solar Temple (Infingame), Solar Queen (Infingame), Solar King (Infingame)&nbsp;<br><br></p>
<p>- Playtech:&nbsp;Age of the Gods: Ruler of the Seas, Shields of Rome, Storms of Ice Power Play Jackpot, Wild Lava, Savage Jungle, Viking Runecraft, Pragmatic, 3 Kingdoms &ndash; Battle of Red Cliffs, Bronco Spirit, Cash Elevator, Dragon Kingdom - Eyes of Fire, Golden Beauty, Jade Butterfly, Jungle Gorilla, Queen of Gold, The Champions, Wild Depth<br><br></p>
<p>- Push Gaming:&nbsp;Bison Battle, Jammin&apos; Jars 2 , Wild Swarm, Wizard Shop<br><br></p>
<p>- Quickfire:&nbsp;3 Tiny Gods, 300 Shields, Africa X UP, African Quest, Agent Valkyrie, Age of Conquest, Alchemy Blast, Astro Legends: Lyra and Erion, Art of the Heist, Augustus, Beautiful Bones, Bikini Party, Book of Oz, Bookie of Odds, Break Da Bank Again Respin, Castle Builder, Castle Builder II, Cool Buck, Craps, Dragon Dance, Elite of Evil: Portal of Gold (Gamevy), Flower Fortunes, Forsaken Kingdom, Gems Odyssey, Gems Odyssey 92, Gods Of Power, Goldaur Guardians, Golden Stallion, Hot Ink, Le Kaffee Bar, Lil Devil, Lucky Clucks (Crazytooth), Magic of Sahara, Major Millions, Medusa, Mega Moolah, Mega Moolah Isis, Monster Blast, Peek-a-Boo - 5 Reel, Pets Go Wild, Rabbit in the Hat, Reel Gems, Retro Reels, Retro Reels Diamond Glitz, Retro Reels Extreme Heat, Santa Goes Wild, Scrooge, Sisters of Oz WOWPOT, Solar Queen (Playson), Spectacular Wheel of Wealth, Stardust, Sweet Chilli, Tomb Raider - Secret of the Sword, Tomb Raider, Untamed Bengal Tiger, Untamed Crowned Eagle, Untamed Giant Panda, Untamed Wolf Pack, Vampire: The Masquerade - Las Vegas, Village People Macho Moves, Wheel of Wealth Special Edition, Wheel of Wealth, Wild Orient, Zombie Hoard<br><br></p>
<p>- Quickspin:&nbsp;Skulls Up!<br><br></p>
<p>- Red Tiger:&nbsp;5 Families, Ancients Blessing, Aztec Spins, Bombuster, Diamond Blitz, Dynamite Riches, Lucky Fridays, Spin Town, Three Musketeers, Reel Heist, Well Of Wishes<br><br></p>
<p>- Relax:&nbsp;3 Secret Cities (4ThePlayer), 100 Bit Dice (4ThePlayer), Book of 99, Deep Descent, Frequent Flyer, Hellcatraz , Kingmaker (BTG), Lil Devil (BTG), Marching Legions, Royal Mint (BTG), Slot Vegas Megaquads (BTG), Trail Blazer (Northernlights), Wizard Shop (Push Gaming)<br><br></p>
<p>- Spinomenal:&nbsp;1 Reel Egypt, 1 Reel Fruits, 1 Reel Halloween, 1 Reel Monkey, 1 Reel Xmas, Cupids Strike 2, Divine Forest, Lemur Does Vegas, Summer Splash, Mines of Gold, BlackJack<br><br></p>
<p>- Slotegrator:&nbsp;Solar King, Solar Temple<br><br></p>
<p>- Swintt:&nbsp;Egypt King<br><br></p>
<p>- Thunderkick:&nbsp;1429 Uncharted Seas, Barbershop: Uncut, Bork The Berzerker, Fruit Warp, Toki Time<br><br></p>
<p>- TrueLab:&nbsp;Crypts of Fortune, Mining Factory, Victoria Wild<br><br></p>
<p>- Yggdrasil:&nbsp;Alchymedes, Ancient Eclipse, Cauldron, Cazino Cosmos, Dark Vortex, Dwarf Mine, Double Dragons, Football Glory, Hammer of Gods, Holmes and the Stolen Stones, Jackpot Raiders , Johnan Legendarian, Jokerizer, Legion Hot 1, Ozwin&rsquo;s Jackpots, Rise of the Valkyrie Splitz, Robin Sherwood Marauders, Spina Colada, The Hot Offer, The Dark Joker Rizes, The Royal Family, Towering Pays Valhalla, Tut&apos;s Twister, Vikings Go to Hell, Vikings Go Berzerk, Vikings Go To Valhalla, Victoria Wild, Wicked Circus, Wolf Hunters<br><br></p>
<p>- Wazdan:&nbsp;9 Lions, Black Horse, Black Horse Deluxe, Butterfly Lovers, Hot 777, Hot 777 Deluxe, Larry The Leprechaun, Larry the Leprechaun Easter, Reel Hero, Relic Hunters and the Book of Faith, Sonic Reels: 0%).<br><br>We reserve the right to forfeit winnings if bonus funds are wagered on these games.</p>
<p><br></p>
<p>All Table Games and Live Casino games: 0%</p>
<p>All Video Poker games: 0%</p>
<p>All other games: 0%</p>
<p>2.4. We reserve the right to update this list and forfeit any winnings if bonus funds are wagered on these games.</p>
<p>2.5. The stake size on any game with a &quot;bonus buy&quot; or &quot;feature buys&quot; option will count as the total cost of the spin, not the stake or value of the game round the feature or bonus is played at. For example, for Money Train at &euro;1 stake, the bonus buy is 80x (&euro;80), so the bet size for this round would be &euro;80.<br><br>2.6. Although the rules listed above are {{{siteName}}} default wagering settings, players&rsquo; participation in specific promotions may necessitate special requirements that differ from those above. For example, table games, excluded from wagering by default, might become the only type of games eligible for wagering bonus money within special promotions for table games. Any promotion with an irregular wagering mode will have an accurate description of this mode in its terms and conditions.</p>
<p><br></p>
<p><br></p>
          `
        }),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: JSON.stringify({ EN: 'General Terms & Conditions' }),
        slug: 'general-terms',
        content: JSON.stringify({
          EN: `
          <h3>1. Introduction</h3>
          1.1 {{{siteName}}} Casino is licensed by HNA Gaming B.V, a company based in Fransche Bloemweg 4, Willemstad, Curaçao, under the gaming license number 8048/JAZ issued by Antillephone Services N.V., authorised and regulated by the Government of Curacao.<br>
          1.2 {{{siteName}}} Casino is operated by tgt Group Ltd acting as a Merchant of Record, tgt Group Ltd., a company incorporated under the Laws of Cyprus with registration number HE 436088, VAT number 10436088C, and registered at Peiraios, 34A Strovolos, 2023, Nicosia, Cyprus with contact phone number +357 2232 4291.<br>
          1.3 tgt Group Ltd. is a 100% subsidiary of HNA Gaming B.V.<br>
          1.4 {{{siteName}}} Casino reserves the right to modify the terms and conditions at any time. Players who have already accepted the previous version of the terms will be notified via e-mail and requested to re-accept the new version of the terms via popup upon first login after terms update. These become effective as soon as they are published on this page without retroactive effect.
          With regard to bonuses and promotions terms & conditions, it’s the user's responsibility to read these terms and conditions and to refer to them regularly. Any deposit or game on {{{siteName}}} Casino implies that any user of the platform accepts these terms.<br>
          1.5 Payments are processed by tgt Group Ltd and for payment disputes Cypriot law applies.<br><br>
          <h3>2. Account</h3>
          2.1 To be able to play real money games on {{{siteName}}} Casino, an account must be opened.<br>
          2.2 The minimum age required to create an account is 18 years old.<br>
          2.3 Players residing in countries which are not available on the registration form cannot create an account or play on {{{siteName}}} Casino.<br>
          2.4 The Company only allows one (1) account per player, household, IP address, email address, phone number, payment methods (debit or credit cards). In the event that our security system detects that information is identical on several accounts, we then speak of "multi-accounts", which is strictly forbidden and, in this case, all accounts can be immediately closed by the fraud department.<br>

          2.5 If several players wish to play in our casino from a common computer network (dormitories, fraternities, etc.), or from the same household, we strongly suggest that they contact our support service, before creating accounts. multiple, to avoid unnecessary security procedures.<br>
          2.6 In order to open an account, the player will be invited to complete a registration form and provide the following personal information: a "username", a "password", "Name", "First name", "email" , “Phone number”, “home address”, “gender”, “date of birth” and “currency”. The name registered on the player's account must deposit the legal name and identity of the player.<br>
          2.7 It is the player's responsibility to ensure that he is the one and only person able to access his account by ensuring that his login information is kept secure. We recommend that our users log out of their account at the end of each game session for more security. <br>
          2.8 The player is advised to create a strong password containing upper and lower case letters, alphabetic characters, special characters and numbers. The suggested minimum length is eight characters including a capital letter, a number and a symbol.<br>
          2.9 The Company reserves the right to prohibit the use of pseudonyms and / or avatars that it deems inappropriate, in particular those of a political, racist, pornographic, insulting, violent nature, condoning terrorism, drugs and / or weapons. We also reserve the right to refuse to activate an account at any time and for any reason.<br><br>
          <ul><h3>2.9.1 Inactive Account :</h3>
          2.9.1.1 An account on which no activity has been recorded for at least 6 months will be considered inactive.<br>
          2.9.1.2 We reserve the right to apply an account management fee of 5 EUR, INR 500, USD 5, JPY 750, NZD 5, AUD 5, TRY 100, CAD 5, NOK 50, PLN 25, HUF 2000 per month, to any inactive credit account. In this case, said charges will be deducted from the active cash balance until the account is active again and / or until the active balance is zero.
          2.9.1.3 Once the balance is zero, no more inactivity fees will be applied by the Company.<br>
          2.9.1.4 Players have the possibility to recover the remaining funds on their inactive accounts by logging into their personal account and making a withdrawal request.<br>
          2.9.1.5 In the case of blocked and / or excluded accounts, players must contact customer support to recover these dormant funds.</ul><br>
          <h3>3. Acccount Verification</h3>
          3.1 All accounts need to be verified for age verification, fraud prevention, withdrawal processing, promotional restrictions, account closings, etc.<br>
          3.2 Any withdrawal request requires prior account verification. The required documents are as follows:
          <ul><li>A valid personal identification document (passport, driving license or national identity card).
          <li>Proof of address of less than 3 months in PDF format on which the full name and address of the player are mentioned. Bank account statements, payslip, water, gas and electricity bills as well as landline / internet bills are considered as proof of address.
          <li>Any official document from the user's banking institution on which the IBAN code and the BIC / SWIFT code appear.
          Failure to provide one of these supporting documents, the user must inform customer service.</ul>
          3.3 All {{{siteName}}} Casino accounts may be subject to a general or specific verification relating to the player's age, identity, means of payment as well as compliance with our terms of use. In the event that the player does not meet the time limits required to verify the account, {{{siteName}}} Casino reserves the right to temporarily suspend access to the games.<br>
          3.4 If you wish to verify your account before requesting a withdrawal, you should contact our live support. Documents can be emailed to verifications@{{{siteUrl}}} or through live chat.<br>
          3.5 Once you receive an email from our KYC team (Know Your Customers), please be sure to upload all requested documents within the allotted time following the instructions. Each link allows the download of a single document.<br>
          3.6 The information on the documents submitted must correspond to the information provided by the player when creating his {{{siteName}}} Casino account. The player agrees to inform customer service of any change in the situation, in order to keep his account up to date and verified by providing supporting documents.<br>
          3.7 The player will take care to submit a complete file and including authentic, legible and good quality documents, so that the processing times can be respected.<br>
          3.8 The processing time for account verification is 1 (one) working day, once all the necessary supporting documents have been received. However, the delay may be altered by an extraordinary and unusual situation.<br>
          3.9 The verification of your documents is carried out by our operator tgt Group Ltd. So your documents may have already been received and verified from another casino of this operator.<br><br>
          <h3>4. Deposits</h3>
          4.1 The minimum deposit amount is 10 EUR, INR 1000, USD 10, JPY 1500, NZD 10, AUD 10, TRY 200, CAD 10, NOK 100, PLN 50, HUF 4000 and the maximum amount is 2500 EUR, INR 200000, USD 2500, JPY 350000, NZD 2500, AUD 2500, TRY 50000, CAD 2500, NOK 25000, PLN 10000, HUF 1000000 per transaction.<br>
          4.2 When making a deposit, the player authorizes {{{siteName}}} Casino to use Electronic Service Providers (PSE) and / or third party payment providers for the processing of the various financial transactions, he therefore accepts to be bound directly to the general conditions of use of said partners.<br>
          4.3 By choosing a deposit method, the player accepts the conditions and all the costs that may be applied to him by a third party, such as his banking establishment (conversion fees, international transaction fees, etc.)<br>
          4.4 Any deposit method used must correspond to the first and last name of the {{{siteName}}} Casino account holder.<br>
          4.5 The list of available payment methods may change according to the wishes of the company and / or according to the player's geographical area.<br>
          4.6 By choosing to play for money on games of chance, the user accepts the possible risk of losing.<br>
          4.7 Stakes and deposits made on the site may be refunded under certain conditions. (See 15. Refunds)<br>
          4.8 Deposits by check, cash or wire transfer are not permitted on the site.<br><br>
          <h3>5. Withdrawals</h3>
          5.1 In order to make a withdrawal, the user's account must be verified (see 3. Verifications).<br>
          5.2 The minimum withdrawal amount is 10 EUR, INR 1000, USD 10, JPY 1500, NZD 10, AUD 10, TRY 200, CAD 10, NOK 100, PLN 50, HUF 4000, unless explicitly stated otherwise in the terms and conditions of the specific promotion.<br>
          5.3 A deposit must be wagered at least 1 (once) before part or all of the balance is withdrawn, in accordance with the standards imposed on us in the context of the fight against money laundering.<br>
          5.4 The withdrawal means are linked to the deposit methods used during the deposits previously made. If a payment method does not allow a payment to proceed smoothly, we reserve the right to choose the method of payment for the withdrawal.<br>
          5.5 In special cases, generally to prevent money laundering, we reserve the right to pay the withdrawal by a payout method of our choice and even if it is not the one initially required. Withdrawal requests on non-refundable credit cards will be issued to an electronic wallet of your choice or by bank transfer. In this case, all processing costs are the responsibility of the player.<br>
          5.6 The maximum withdrawal amount for a player is 2500 EUR, INR 200000, USD 2500, JPY 350000, NZD 2500, AUD 2500, TRY 50000, CAD 2500, NOK 25000, PLN 10000, HUF 1000000 per 7-day period, until full payment and unless otherwise specified in the Promotional Terms and Conditions, or except at our discretion, in the case of players having a privileged status for example.<br>
          5.7 Withdrawal requests may be canceled at any time by the player as long as they have not been processed by the financial department.
          5.8 If the withdrawal amount is limited (in the case of player wins with the free registration bonus for example), any balance exceeding the maximum authorized amount will be canceled and deleted from the account.<br>
          5.9 Any withdrawal request made cancels the current active bonuses, including non-activated free spins (see General Bonus Conditions).<br>
          5.10 In the event that one or more deposits are canceled or refused by the payment provider, we reserve the right to refuse or withhold any associated bonus amount or winnings.<br>
          5.11 The processing time for withdrawal requests is 3 (three) working days once all account verification documents have been received, analyzed and confirmed and in the event that no further verification is required.<br>
          5.12 Any withdrawal request will be subject to verification by our fraud department, which reserves the right to cancel all or part of the funds in the event of non-compliance with our present Terms and Conditions. The player will then be informed by email (see 4. Account Closures ans Holdings of Funds).<br>
          5.13 It is up to the player to inquire about the taxes and duties applicable to his winnings in his jurisdiction.<br><br>
          <h3>6. Bonuses and Promotions</h3>
          6.1 To view the terms and conditions for using bonuses, please click <a href="{{{siteUrl}}}/en/bonus-terms"><span class="s1">here</span></a><br>
          <h3>7. Customer Service</h3>
          7.1 Customer service is available 24/7 through live chat.<br>
          7.2 The user undertakes to use correct and respectful language in his interactions with the members of the {{{siteName}}} Casino team. Any abuse or behavior deemed inappropriate may lead to suspensions or the final closure of the account.<br><br>
          <h3>8. The Fight against Money Laundering and the financing of Terrorism.</h3>
          8.1 We are subject to the laws against money laundering and terrorist financing and in this regard must exercise due diligence on all accounts. Information provided to us, for account verification or other situations set forth in our terms and conditions, will be treated in accordance with our privacy policy and may not be used for any other purpose.<br>
          8.2 The player hereby acknowledges and agrees that we will use the information provided for our due diligence obligations, to carry out public research and to carry out checks to verify the veracity of the data provided to us. <br>
          8.3 While we are applying our due diligence measures, the player may be allowed to continue to use their account. However, he will not be allowed to make withdrawals from this account until our verification procedures are completed.<br>
          8.4 Where we are unable to fulfill our due diligence obligations because we have not received the required information from the player or are unable to verify their identity, no activity can be undertaken from the account and the account will be blocked and / or closed. In such event, we will return any deposit funds present in the account at the time of blocking and / or closing, unless it is necessary for us to delay or withhold payment of all or part of the player's funds to comply with our legal obligations.<br>
          8.5 The user agrees to cooperate and provide additional information and / or supporting documents necessary for the fulfillment of our obligations. Any communication for the provision of information / documentation should not be considered as a final communication in this regard.<br>
          8.6 If we learn or suspect that the information provided by the player is materially false, we will cancel the registration and take any other action we may require under the law. We will not pay any winnings in such circumstances.<br><br>
          <h3>9. Responsible Gaming</h3>
          9.1 The player can choose, at his discretion, a deposit limit by setting the amount and the desired period. Once registered and when said limit is reached, the player will no longer be able to deposit until his limit is reset. It should be noted that the deposits already made over the period will be taken into account in the calculation of the limit.<br>
          9.2 The player may, at his discretion, choose to limit his ability to access his player space for a determined period using the “Account freeze” option from his cashier. Following this limitation, the active funds will then be frozen and no transaction can be carried out on his account. The player will be able to enjoy his funds at the end of the defined freeze period.<br>
          9.3 All restrictions and exclusions will take effect immediately after confirming the settings in the Cashier // Limit section of the player account.<br>
          9.4 Any request for account freezing and / or exclusion will only be valid for the brand on which the player has requested it ({{{siteUrl}}}) and does not include other sites that we operate.<br>
          9.5 Our staff have no control over checkout options, which means they can only be changed or removed by the player. Any increase or removal of the limit will be effective within 24 hours exactly.<br><br>
          <h3>10. Data Protection</h3>
          10.1 We hereby warrant that we adopt adequate technical and organizational measures to ensure the security of our systems and the integrity of data transmitted on our website.<br>
          10.2 The player hereby acknowledges that his personal data will be processed by the licensee or by any other person, company or business associated in any way or otherwise engaged by the licensee to provide him with services as stipulated in these conditions. general. We will process players' personal data in accordance with the privacy policy of this website.<br>
          10.3 Registration of personal data
          {{{siteName}}} Casino guarantees that the personal data of our players is always obtained lawfully and treated fairly, in accordance with the rights of the player concerned and our regulatory obligations or recommendations. This allows us to guarantee safe and user-friendly sailing conditions for our players. This information may be disclosed to law enforcement authorities or our data processing service providers for review where it complies with our legally binding duties or obligations. {{{siteName}}} Casino is committed to protecting your privacy and your personal information.<br><br>
          10.4 Retention of personal data<br><br>
          The personal information we collect is kept secure in accordance with legal data security and retention requirements. Under applicable laws and regulations, {{{siteName}}} Casino is required to maintain a secure online list of all registered players. In addition, {{{siteName}}} Casino is obliged to keep all personal data submitted during registration and all data transmitted during the period of operation of a player account for at least five years from the last transaction of the player or the closing of the account. {{{siteName}}} Casino will retain this information for the period required by gambling laws and regulations.
          For more information, please refer to the Privacy Policy.<br><br>
          10.5 Cookies
          The {{{siteName}}} Casino site requires the storage of small data sent by the web server to the browser, commonly known as “Cookies”.
          The use of a cookie is in no way linked to the player's personal information, but with the aim of offering an ever more optimized and personalized gaming experience.
          Please be aware that the website {{{siteUrl}}} cannot be used correctly if cookies are disabled.<br><br>
          10.6 Communication
          {{{siteName}}} Casino can communicate to its registered members, informative and / or promotional content by means of newsletters and / or SMS.
          The user can unsubscribe from newsletters at any time by clicking on the "Unsubscribe" button at the bottom of the e-mail or by replying the word "STOP" to the SMS received.<br><br>
          <h3>11. Complaints</h3>
          11.1 The player can contact our customer service at {{{supportEmailAddress}}} and according to the instructions located on the website to inform us of any complaint and / or malfunction concerning our services (registration form, transactions, stakes, winnings, etc. .).<br>
          11.2 In the event of a wager not being recorded on time by the servers, the casino cannot be held responsible or liable for the result of the round. Likewise, any amount engaged cannot be the subject of a request for reimbursement.<br>
          11.3 Complaints are handled by the support team and forwarded to management if necessary. Any complaints considered reasonable will be dealt with within 24 hours.<br>
          11.4 The player has the right to submit unresolved disputes to Antillephone Services N.V. through complaints@xcm.com.<br>
          11.5 For more information on the Authority, please visit www.curacao-egaming.com<br>
          11.6 The Company cannot be held responsible for any unintentional interruption of operation of the Site following unforeseen circumstances or for reasons beyond its control, in particular, but not exhaustively: natural disasters, such as earthquakes, floods, fires, earthquakes, hurricanes, tropical storms; war, insurrection, arson, embargoes, acts of civil or military authorities, or terrorism; fiber optic cuts, strikes, or shortages of transportation, infrastructure, fuel, energy, labor or materials; the breakdown of infrastructure providing telecommunications and information services; hacking.<br><br>
          <h3>12. Governing Law</h3>
          12.1 These general conditions are governed by the laws of Curaçao.<br>
          12.2 The parties agree that any dispute, controversy or claim arising out of or in connection with these terms and conditions, or their breach, termination or invalidity, will be subject to the exclusive jurisdiction of Curaçao.<br>
          12.3 The regulations of the games and the services of the platform are governed by the laws of Curaçao.<br>
          12.4 You are solely responsible for complying with any law applicable in your country of residence and if you are authorized by the law applicable in your country of residence to play, you may open an account with us. We accept no liability for any violation or violation of applicable law. Otherwise, we reserve the right to reject your request to open an account or to deactivate your account. In addition, players declare that they are not residents of the United States and its dependencies or of Curacao. {{{siteName}}} Casino also prohibits persons located or residing in certain jurisdictions.<br><br>
          <h3>13. Game Restrictions</h3>
          13.1 The following territories are restricted by the game providers:
          Afghanistan, Albania, Algeria, Angola, Australia, Bahamas, Botswana, Belgium, Bulgaria, Curacao, Colombia, Croatia, Czech Republic, Denmark, Estonia, Ecuador, Ethiopia, France, Ghana, Guyana, Hong Kong, Italy, Iran, Iraq, Israel, Kuwait, Latvia, Lithuania, Mexico, Namibia, Nicaragua, Netherlands, North Korea, Pakistan, Panama, Philippines, Portugal, Romania, Singapore, Spain, Sudan, Syria, Taiwan, Trinidad and Tobago, Tunisia, Uganda, United Kingdom, United States of America, Yemen, Zimbabwe.<br><br>
          <h3>14. Account Closures and Holdings of Funds.</h3>
          14.1 The player can request the closure of his account at any time by contacting customer support via the chat or by sending an email to {{{supportEmailAddress}}}. Any request will be processed within 24 working hours, to the extent possible.<br>
          14.2 {{{siteName}}} Casino reserves the right, at its sole discretion, to permanently deactivate your account at any time and for any reason. In this case, the player immediately loses all his rights to the bonuses and / or any other promotional offer which would have been granted to him.<br>
          14.3 When an account is closed and whatever the origin, if we notice cheating, irregular gambling, collusion, fraud / criminal activity, or a violation of the terms of these General Conditions, we will reserve the right to withhold funds still in the balance. If it is not possible to pay the entire balance at once, due to payment limits or other reasons, the account will remain open until the full amount has been withdrawn by the player.<br>
          14.4 Any actual active balance in your account when it is closed, will be credited to a payment method recorded on your account, and of our choice, unless we withhold these sums for the reasons mentioned above.<br>
          14.5 Also, the Casino reserves the right, at its sole discretion, to cancel any winnings and confiscate any balance in any of the following circumstances:<br><ul>
          a. If you have more than one active account with {{{siteName}}} Casino;<br>
          b. If the name appearing on your player account does not deposit the name appearing on the payment or withdrawal method used (including credit card (s), e-wallet, money transfers, etc.);<br>
          c. If you provide incorrect or misleading registration or player profile information;<br>
          d. If you are not of legal age in the province / state / country and / or jurisdiction where you reside;<br>
          e. If you have authorized or permitted (intentionally or unintentionally) someone else to access or play on your account;<br>
          f. If you have not played individually for your own personal entertainment (i.e. you have played in a professional capacity, with the intention of exploiting our bonuses or in concert with one or more other players in as part of a club, group, etc.);<br>
          g. If you have requested a refund of any of the deposits made with your credit card or any other available payment method associated with your account or if you have threatened to do so;<br>
          h. If you are found guilty of collusion, cheating, criminal activity such as money laundering or fraudulent activity;<br>
          i. If it is established that you have employed or used a system (including the elements hereafter cited but not limited to machines, computers, software, algorithms or other automated "bot" systems) designed specifically to defeat {{{siteName}}} Casino, increase its chances of winning or that you have adopted habits and / or irregular betting or betting strategies. Thus, any use of automated programs or devices but also any game manipulation such as the use of the practice of Martingale, the Paroli Betting System or the Bonus Hunt (non-exhaustive list) are not authorized.<br>
          j. If you have used the site, or your account in a malicious manner.<br>
          k. If you use an anomaly to your advantage of the elements mentioned below but not limited to the system, balances, bonuses, free spins. The related winnings may also be frozen, and / or confiscated in part or in full.<br>
          l. If we learn that you have played at another online casino in any of the above circumstances. </ul><br>
          <h3>15. Refunds</h3>
          15.1 Refunds are in addition to a customer's rights as a consumer under applicable consumer protection laws and regulations.<br>
          15.2 All sums deposited by players are kept in the player account. Player funds are kept in bank accounts separate from professional accounts.<br>
          15.3 After filing a dispute regarding a deposit related issue, the player may request a refund.<br>
          15.4 To request a refund, the player must contact customer service, clearly describe the problem and specify the amount of the refund requested.<br>
          15.5 This request will be sent to the competent service, depending on the nature of the request.<br>
          15.6 The reimbursement request can be examined at any time, depending on the nature of the request.<br>
          15.7 The refund request will be diligently investigated and, if necessary, information will be obtained from the player's account, game providers, PSPs, etc. until a precise and satisfactory conclusion can be reached.<br>
          15.8 In the event of a reimbursement agreement, the amount transferred will be a true reflection of what is owed to the player and proportional to the player's existing balance and winnings.<br>
          15.9 We reserve the right to withhold any refund until the identity of the account holder is established to our satisfaction.<br>
          15.10 Where possible, refunds will be made using the same method used for deposits. In the event that the payment method used for the deposit does not support withdrawals, the refund will be processed only by bank transfer. In exceptional circumstances, when the payment method used for deposit supports withdrawals and we cannot send a wire transfer due to restricted areas, the refund can be made to a crypto wallet.<br>
          15.11 Reimbursement will be made in full, to the extent possible, and not over a period of time.<br>
          15.12 In the event that the request is not approved, the player will be informed of the reasons why his request was refused.<br>
          15.13 If the player is still not satisfied, they should send an email to customer support and a manager will contact them directly to resolve the situation.<br>
          15.14 If the situation still cannot be resolved, the player should refer to our complaints procedure policy. (see. 11. Complaints).<br>
          15.15 To the extent possible, the time / period between a refund request and resolution, approving or not approving the refund, will not exceed 72 hours from receipt of the request.<br><br>
          Last Updated: 8th March 2023<br>
          V 0.1
          `
        }),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: JSON.stringify({ EN: 'Responsible Gambling' }),
        slug: 'responsible-gambling',
        content: JSON.stringify({
          EN: `
          <h3>RESPONSIBLE GAMING</h3>
          <p>Playing at {{{siteName}}} Casino. should be fun and enjoyable. Our mission is to entertain you but we understand the potential risks of problem gambling. We have provided below some ways to make sure your gambling is within controllable limits along with suggesting some places to go to if you need help.</p>
          <p>&nbsp;</p>
          <p>Here are some tips:</p>
          <ul>
          <li>
          <p>Jobs are for making money, but gambling is for entertainment. Treat it as an entertainment expense, like a ticket to the cinema, rather than a way to make money.</p>
          </li>
          <li>
          <p>Only gamble with money you can afford to lose.</p>
          </li>
          <li>
          <p>Know your limits and be clear about them before you start betting.</p>
          </li>
          <li>
          <p>Take a break. Gambling continuously without taking a break will impact your judgement.</p>
          </li>
          <li>
          <p>Don&rsquo;t gamble when you&rsquo;re upset or depressed. Talk to mates or family or get in touch with a Help Organization.</p>
          </li>
          <li>
          <p>Do other stuff. Sometimes less is more, so make gambling a part of a well-balanced lifestyle.</p>
          </li>
          <li>
          <p>Don&rsquo;t go chasing losses. Set your limits, stay in control.</p>
          </li>
          </ul>
          <p>&nbsp;</p>
          <p>KNOW YOUR LIMITS</p>
          <p>Since at {{{siteName}}} Casino we believe that your ability to play safely is very important, we have tools that are there for you to use if you feel the need to have a break.</p>
          <p>In the Limits section of your account you will find:</p>
          <p><strong>Deposit Limits</strong></p>
          <p>This will limit the amount you can deposit during a certain period. Once you have reached this sum you will not be able to make any new deposits until your limit is reset.</p>
          <p><strong>Wager Limits</strong></p>
          <p>This will limit the total amount you can bet during a certain period. When you have reached these sums, you will not be able to place any new bets until your limit is reset.</p>
          <p><strong>Loss Limits</strong></p>
          <p>This limit will prevent you from losing more than you are willing to lose. (winnings are not included in the calculation). Once you reach the loss limit they will be unable to lose beyond the set limit.</p>
          <p><strong>Session Limits</strong></p>
          <p>It&rsquo;s important that you keep track of the amount of time you spend gambling. We recommend you take note of the time you start gambling set Session Limits and keep an eye on the clock to make sure that you aren&rsquo;t spending more time than you should be. We also strongly advise you to keep your device clock enabled whilst gambling so you can easily refer to it.</p>
          <p><strong>Take a Break</strong></p>
          <p>You may feel in control but would like a break to consider your gambling, or maybe you are in the middle of a busy time and don&rsquo;t want to spend time or energy on gambling. If this is the case, taking a break may help you.</p>
          <p>Take a Break can be applied to your account from 24 hours up to a maximum of 30 days During this period, you will be restricted from accessing your {{{siteName}}} Casino account and we will stop any contact or marketing offers.</p>
          <p><strong>Self-Exclusion</strong></p>
          <p>Should you be unable to control your gambling and decide to make a much longer break or even permanent, then it is possible to self-exclude. Choosing to self-exclude will mean that it will not be possible to reopen your account once in effect for periods ranging from six months to 1 year or even Permanent by clicking&nbsp;<a href="{{{siteUrl}}}/en/account/limits">here</a>.&nbsp;In order to request a longer self-exclusion please contact us via live chat or email&nbsp;{{{supportEmailAddress}}}.</p>
          <p>&nbsp;</p>
          <p><strong>SELF ASSESSMENT TEST</strong></p>
          <p>If you are not sure about your gambling activity please feel free to conduct the GamCare Self-Assessment Test by clicking&nbsp;<a href="https://www.gamcare.org.uk/self-help/self-assessment-tool/">here</a></p>
          <p>The assessment consists of statements to evaluate and give a score on a scale of 1-10 according to how much they apply to you. The result will provide you with a breakdown of how gambling is affecting your life and will give you personalised recommendations for your next steps.</p>
          <p>&nbsp;</p>
          <p><strong>PROFESSIONAL SUPPORT</strong></p>
          <p><a href="https://www.gamblersanonymous.org.uk/">Gamblers Anonymous</a></p>
          <p>is a fellowship of men and women who share their experience, strength and hope with each other that they may solve their common problem and help others to do the same. They offer various aids for the compulsive gambler including a forum, a chat room, literature and most importantly a meeting finder.</p>

          <p><a href="https://www.gamcare.org.uk/">GamCare</a></p>
          <p>Founded in 1997, GamCare is the leading provider of information, advice and support for anyone affected by problem gambling. They operate the National Gambling Helpline, provide treatment for problem gamblers and their families, create awareness about responsible gambling and treatment, and encourage an effective approach to responsible gambling within the gambling industry</p>
          <br>
          <p><strong>ADDITIONAL TIPS</strong></p>
          <p>Many banks, fintech banks and e-wallet providers across Europe now offer gambling blocks that allow their customers to block gambling transactions on their accounts. If you want to implement these, your bank should explain how to do this, or could even do it for you. Please be aware that these blocks are not permanent, they can be switched on and off with varying delays, so it&rsquo;s also a good idea to have other support in place if you want to stop gambling completely.</p>
          <p>Some banks may also allow you to set a spending limit for a single debit card transaction, or temporarily freeze your card if you feel like your spending is getting out of control. This will vary from bank to bank so check what protections your bank can put in place for you.</p>
          <p>Another way of taking some time away from online gambling is to put a &ldquo;blocker&rdquo; on your device, well-known ones are Gamblock or Betblocker.</p>
          <p>Please note&nbsp;that tgt Group takes no responsibility for the performance or quality of the software suggested on this page that is not supplied by ourselves.</p>
          <br>
          <p><strong>PREVENTING UNDERAGE GAMBLING</strong></p>
          <p>It is illegal for anybody under the age of 18 to open an account or gamble with {{{siteName}}} Casino. We take our responsibilities in this area very seriously and follow a few steps to verify our customers are over 18.</p>
          <p>Anyone under the age of 18 found using this site will have winnings forfeited and the account will be closed with immediate effect.</p>
          <p>We also advise that you familiarise yourself with the built-in parental tools on your Mobile/Tablet/PC/TV devices</p>
          <p>Limit the amount of time your children spend online.</p>
          <p><br></p>
          <p><br></p>
          <p><br></p>
          `
        }),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    ])
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.bulkDelete({ tableName: 'cms_pages', schema: 'public' }, null, {})
  }
}
