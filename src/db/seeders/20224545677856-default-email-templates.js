module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'email_templates', schema: 'public' }, [
      {
        is_default: true,
        type: 0,
        label: 'Default Active User',
        dynamic_data: JSON.stringify(['siteName', 'subject', 'siteUrl', 'siteLogo']),
        template_code: JSON.stringify({
          EN: `
          <!DOCTYPE html>
          <html lang="en">

          <head>
              <title>Active User</title>

              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">

              <style>
                  * {
                      box-sizing: border-box;
                      padding: 0;
                      margin: 0;
                  }
              </style>
          </head>

          <body>
              <table border="0" style="width: 600px; background-color: #201C29; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 15px auto;">
                  <tbody>
                      <tr>
                          <td style="padding: 20px;">
                              <img src={{{siteLogo}}} style="width: 100px; display: block; margin: auto;" alt="img">
                          </td>
                      </tr>

                      <tr>
                          <td style="text-align: center;">
                              <img src="" style="width: 100px; display: block; margin: auto;" alt="img">
                          </td>
                      </tr>
                      <tr>
                          <td style="text-align: center;">
                              <div style="min-height: 260px; margin-top: 50px; align-items: center; padding: 20px;">
                                  <h6 style="font-size: 28px; font-weight: 900; letter-spacing: 1.5px; text-align: center; margin-bottom: 35px;">
                                      <span style="color: #68E752; display: block;">Congratulations</span>
                                      <span style="color: #ffffff; display: block;">Your Account is now Active.</span>
                                  </h6>
                                  <a style="color: #ffffff;" target="_blank" href={{{siteUrl}}}>
                                      <button type="button" style="min-width: 275px; background-color: transparent; border: 3px solid #ffffff; border-radius: 36px; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: .5px; cursor: pointer; padding: 12px 30px;">
                                          Get Started</button></a>
                              </div>
                          </td>
                      </tr>

                      <tr>
                          <td style="text-align: center; padding: 15px 20px 15px;">
                              <p style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: .5px; text-align: center;">@2023 {{{siteName}}}</p>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </body>

          </html>
        `
        }),
        is_primary: 0,
        updated_at: new Date(),
        created_at: new Date()
      },
    //   {
    //     is_default: true,
    //     type: 1,
    //     label: 'Default In-Active User',
    //     dynamic_data: JSON.stringify(['siteName', 'subject', 'siteUrl', 'siteLogo', 'reason']),
    //     template_code: JSON.stringify({
    //       EN: `
    //       <!DOCTYPE html>
    //       <html lang="en">

    //       <head>
    //           <title>Inactive User</title>

    //           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
    //           <link rel="preconnect" href="https://fonts.googleapis.com">
    //           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    //           <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">

    //           <style>
    //               * {
    //                   box-sizing: border-box;
    //                   padding: 0;
    //                   margin: 0;
    //               }
    //           </style>
    //       </head>

    //       <body>
    //           <table border="0" style="width: 600px; background-color: #201C29; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 15px auto;">
    //               <tbody>
    //                   <tr>
    //                       <td style="padding: 20px;">
    //                           <img src={{{siteLogo}}} style="width: 100px; display: block; margin: auto;" alt="img">
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center;">
    //                           <img src="" style="width: 100px; display: block; margin: auto;" alt="img">
    //                       </td>
    //                   </tr>
    //                   <tr>
    //                       <td style="text-align: center;">
    //                           <div style="min-height: 310px; align-items: center; padding: 20px;">
    //                               <h6 style="font-size: 28px; font-weight: 900; letter-spacing: 1.5px; text-align: center; margin-bottom: 35px;">
    //                                   <span style="color: #ffffff; display: block;">Your Account is</span>
    //                                   <span style="color: #FF3131; display: block;">Deactivated</span>
    //                               </h6>
    //                               <p style="color: #ffffff; font-size: 15px; font-weight: 400; letter-spacing: 1.5px; margin-bottom: 35px;">Reason for Deactivation.<br> {{{reason}}}</p>
    //                               <a style="color: #ffffff;" target="_blank" href={{{siteUrl}}}>
    //                                   <button type="button" style="min-width: 275px; background-color: transparent; border: 3px solid #ffffff; border-radius: 36px; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: .5px; cursor: pointer; padding: 12px 30px;">
    //                                       Visit Site</button></a>
    //                           </div>
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center; padding: 15px 20px 15px;">
    //                           <p style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: .5px; text-align: center;">@2023 {{{siteName}}}</p>
    //                       </td>
    //                   </tr>
    //               </tbody>
    //           </table>
    //       </body>

    //       </html>
    //     `
    //     }),
    //     is_primary: 0,
    //     updated_at: new Date(),
    //     created_at: new Date()
    //   },
      {
        is_default: true,
        type: 2,
        label: 'Default Email Verification',
        dynamic_data: JSON.stringify(['link', 'subject', 'siteName', 'siteLogo']),
        template_code: JSON.stringify({
          EN: `
          <!DOCTYPE html>
          <html lang="en">

          <head>
              <title>Verify Email</title>

              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com">
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">

              <style>
                  * {
                      box-sizing: border-box;
                      padding: 0;
                      margin: 0;
                  }
              </style>
          </head>

          <body>
              <table border="0" style="width: 600px; background-color: #201C29; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 10px auto;">
                  <tbody>
                      <tr>
                          <td style="padding: 10px;">
                              <img src={{{siteLogo}}} style="width: 200px; display: block; margin: auto;" alt="img">
                          </td>
                      </tr>

                      <tr>
                          <td style="text-align: center;">
                              <h2>{{{siteName}}}</h2>
                          </td>
                      </tr>
                      <tr>
                          <td style="text-align: center;">
                              <div style="min-height: 330px;  align-items: center;  padding: 5px;">
                                  <h6 style="font-size: 28px; font-weight: 900; letter-spacing: 1.5px; text-align: center; margin-bottom: 35px;">
                                      <span style="color: #ffffff; display: block;">You nearly There!</span>
                                  </h6>
                                  <p style="color: #ffffff; font-size: 15px; font-weight: 400; letter-spacing: 1.5px; margin-bottom: 35px;">We just need to verify your email address to<br> complete your Deuces signup.</p>
                                  <button type="button" style="min-width: 275px; background-color: transparent; border: 3px solid #ffffff; border-radius: 36px; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: .5px; cursor: pointer; padding: 12px 30px;"><h3 style="color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: .5px;">{{{link}}}</h3> Verify Email Address</button>
                                  <p style="color: #ffffff; font-size: 10px; font-weight: 400; letter-spacing: 1.5px; margin-top: 35px;">Please note that this link will expire in 5 days, if you have not<br> signed up to Deuces, please ignore this email. Thanks.</p>
                              </div>
                          </td>
                      </tr>

                      <tr>
                          <td style="text-align: center; padding: 15px 20px 15px;">
                              <p style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: .5px; text-align: center;">@2024 {{{siteUrl}}}</p>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </body>
          </html>
        `
        }),
        is_primary: 0,
        updated_at: new Date(),
        created_at: new Date()
      },
      {
        is_default: true,
        type: 3,
        label: 'Default Reset Password',
        dynamic_data: JSON.stringify(['link', 'subject', 'siteName', 'siteLogo', 'siteUrl']),
        template_code: JSON.stringify({
          EN: `
          <!DOCTYPE html>
          <html lang="en">

          <head>
              <title>Reset Password</title>

              <link rel="satylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">

              <style>
                  * {
                      box-sizing: border-box;
                      padding: 0;
                      margin: 0;
                  }
              </style>
          </head>

          <body>
              <table border="0" style="width: 600px; background-color: #201C29; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 15px auto;">
                  <tbody>
                      <tr>
                          <td style="padding: 20px;">
                              <img src={{{siteLogo}}} style="width: 100px; display: block; margin: auto;" alt="img">
                          </td>
                      </tr>

                      <tr>
                          <td style="text-align: center;">
                              <img src="" style="width: 100px; display: block; margin: auto;" alt="img">
                          </td>
                      </tr>
                      <tr>
                          <td style="text-align: center;">
                              <div style="min-height: 280px; align-items: center; padding: 20px;">
                                  <h6 style="font-size: 28px; font-weight: 900; letter-spacing: 1.5px; text-align: center; margin-bottom: 35px;">
                                      <span style="color: #ffffff; display: block;">Reset Your Password?</span>
                                  </h6>
                                  <p style="color: #ffffff; font-size: 15px; font-weight: 400; letter-spacing: 1.5px; margin-bottom: 35px;">That’s okey, It happens. Click on the button below<br> to reset your password.</p>
                                  <a style="color: #ffffff;" target="_blank" href={{{link}}}>
                                      <button type="button" style="min-width: 275px; background-color: transparent; border: 3px solid #ffffff; border-radius: 36px; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: .5px; cursor: pointer; padding: 12px 30px;">
                                          Reset Your Password</button></a>
                              </div>
                          </td>
                      </tr>

                      <tr>
                          <td style="text-align: center; padding: 15px 20px 15px;">
                              <p style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: .5px; text-align: center;">@2023 {{{siteName}}}</p>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </body>

          </html>
        `
        }),
        is_primary: 0,
        updated_at: new Date(),
        created_at: new Date()
      },
    //   {
    //     is_default: true,
    //     type: 4,
    //     label: 'Default KYC Rejected',
    //     dynamic_data: JSON.stringify(['kycLabels', 'subject', 'reason', 'siteName', 'siteLogo', 'siteUrl']),
    //     template_code: JSON.stringify({
    //       EN: `
    //       <!DOCTYPE html>
    //       <html lang="en">

    //       <head>
    //           <title>KYC Rejected</title>

    //           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
    //           <link rel="preconnect" href="https://fonts.googleapis.com">
    //           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    //           <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">

    //           <style>
    //               * {
    //                   box-sizing: border-box;
    //                   padding: 0;
    //                   margin: 0;
    //               }
    //           </style>
    //       </head>

    //       <body>
    //           <table border="0" style="width: 600px; background-color: #201C29; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 15px auto;">
    //               <tbody>
    //                   <tr>
    //                       <td style="padding: 20px;">
    //                           <img src={{{siteLogo}}} style="width: 100px; display: block; margin: auto;" alt="img">
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center;">
    //                           <img src="" style="width: 100px; display: block; margin: auto;" alt="img">
    //                       </td>
    //                   </tr>
    //                   <tr>
    //                       <td style="text-align: center;">
    //                           <div style="min-height: 310px; align-items: center; padding: 20px;">
    //                               <h6 style="font-size: 28px; font-weight: 900; letter-spacing: 1.5px; text-align: center; margin-bottom: 35px;">
    //                                   <span style="color: #ffffff; display: block;">KYC Verification</span>
    //                                   <span style="color: #FF3131; display: block;">Rejected</span>
    //                               </h6>
    //                               <p style="color: #ffffff; font-size: 15px; font-weight: 400; letter-spacing: 1.5px; margin-bottom: 35px;">Reason for Rejection,<br> {{{reason}}}</p>
    //                               <a style="color: #ffffff;" target="_blank" href={{{siteUrl}}}>
    //                                   <button type="button" style="min-width: 275px; background-color: transparent; border: 3px solid #ffffff; border-radius: 36px; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: .5px; cursor: pointer; padding: 12px 30px;">
    //                                       Visit Site</button></a>
    //                           </div>
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center; padding: 15px 20px 15px;">
    //                           <p style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: .5px; text-align: center;">@2023 {{{siteName}}}</p>
    //                       </td>
    //                   </tr>
    //               </tbody>
    //           </table>
    //       </body>

    //       </html>
    //     `
    //     }),
    //     is_primary: 0,
    //     updated_at: new Date(),
    //     created_at: new Date()
    //   },
    //   {
    //     is_default: true,
    //     type: 5,
    //     label: 'Default KYC Verified',
    //     dynamic_data: JSON.stringify(['subject', 'siteName', 'userName', 'siteLogo']),
    //     template_code: JSON.stringify({
    //       EN: `
    //       <!DOCTYPE html>
    //       <html lang="en">

    //       <head>
    //           <title>KYC Active</title>

    //           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
    //           <link rel="preconnect" href="https://fonts.googleapis.com">
    //           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    //           <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">

    //           <style>
    //               * {
    //                   box-sizing: border-box;
    //                   padding: 0;
    //                   margin: 0;
    //               }
    //           </style>
    //       </head>

    //       <body>
    //           <table border="0" style="width: 600px; background-color: #201C29; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 15px auto;">
    //               <tbody>
    //                   <tr>
    //                       <td style="padding: 20px;">
    //                           <img src={{{siteLogo}}} style="width: 100px; display: block; margin: auto;" alt="img">
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center;">
    //                           <img src="" style="width: 100px; display: block; margin: auto;" alt="img">
    //                       </td>
    //                   </tr>
    //                   <tr>
    //                       <td style="text-align: center;">
    //                           <div style="min-height: 330px; align-items: center; padding: 20px;">
    //                               <h6 style="font-size: 28px; font-weight: 900; letter-spacing: 1.5px; text-align: center; margin-bottom: 35px;">
    //                                   <span style="color: #68E752; display: block;">Congratulations,</span>
    //                                   <span style="color: #ffffff; display: block;">KYC Active.</span>
    //                               </h6>
    //                               <p style="color: #ffffff; font-size: 15px; font-weight: 400; letter-spacing: 1.5px; margin-bottom: 35px;">Hi {{{playerFullName}}},<br><br> Your KYC has been approved and has been verified,<br> Now you can progress your Withdrawals.</p>
    //                               <a style="color: #ffffff;" target="_blank" href={{{siteUrl}}}>
    //                                   <button type="button" style="min-width: 275px; background-color: transparent; border: 3px solid #ffffff; border-radius: 36px; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: .5px; cursor: pointer; padding: 12px 30px;">
    //                                       Get Started</button></a>
    //                           </div>
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center; padding: 15px 20px 15px;">
    //                           <p style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: .5px; text-align: center;">@2023 {{{siteName}}}</p>
    //                       </td>
    //                   </tr>
    //               </tbody>
    //           </table>
    //       </body>

    //       </html>
    //     `
    //     }),
    //     is_primary: 0,
    //     updated_at: new Date(),
    //     created_at: new Date()
    //   },
    //   {
    //     is_default: true,
    //     type: 6,
    //     label: 'Default KYC Requested',
    //     dynamic_data: JSON.stringify(['subject', 'kycLabels', 'siteName']),
    //     template_code: JSON.stringify({
    //       EN: `

    //       <!DOCTYPE html>
    //       <html lang="en">

    //       <head>
    //           <title>KYC Request - Pending KYC Labels</title>

    //           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
    //           <link rel="preconnect" href="https://fonts.googleapis.com">
    //           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    //           <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">

    //           <style>
    //               * {
    //                   box-sizing: border-box;
    //                   padding: 0;
    //                   margin: 0;
    //               }
    //           </style>
    //       </head>

    //       <body>
    //           <table border="0" style="width: 600px; background-color: #201C29; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 15px auto;">
    //               <tbody>
    //                   <tr>
    //                       <td style="padding: 20px;">
    //                           <img src={{{siteLogo}}} style="width: 100px; display: block; margin: auto;" alt="img">
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center;">
    //                           <img src="" style="width: 100px; display: block; margin: auto;" alt="img">
    //                       </td>
    //                   </tr>
    //                   <tr>
    //                       <td style="text-align: center;">
    //                           <div style="min-height: 220px; margin-top: 40px; align-items: center; padding: 20px;">
    //                               <h6 style="font-size: 28px; font-weight: 900; letter-spacing: 1.5px; text-align: center; margin-bottom: 35px;">
    //                                   <span style="color: #68E752; display: block;">KYC Requested</span>
    //                               </h6>
    //                                <h3 style="color: #ffffff; text-align: center; padding-bottom: 10px;">Hi {{{playerFullName}}},<br>Document '{{{kycLabels}}}' is requested for your KYC Verification</span></h3>
    //                           </div>
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center; padding: 15px 20px 15px;">
    //                           <p style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: .5px; text-align: center;">@2023 {{{siteName}}}</p>
    //                       </td>
    //                   </tr>
    //               </tbody>
    //           </table>
    //       </body>

    //       </html>
    //     </html>
    //       `
    //     }),
    //     is_primary: 0,
    //     updated_at: new Date(),
    //     created_at: new Date()
    //   },
    //   {
    //     is_default: true,
    //     type: 8,
    //     label: 'Default KYC Received',
    //     dynamic_data: JSON.stringify(['subject', 'siteName']),
    //     template_code: JSON.stringify({
    //       EN: `
    //       <!DOCTYPE html>
    //       <html lang="en">

    //       <head>
    //           <title>KYC Received - Pending KYC Labels</title>

    //           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
    //           <link rel="preconnect" href="https://fonts.googleapis.com">
    //           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    //           <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">

    //           <style>
    //               * {
    //                   box-sizing: border-box;
    //                   padding: 0;
    //                   margin: 0;
    //               }
    //           </style>
    //       </head>

    //       <body>
    //           <table border="0" style="width: 600px; background-color: #201C29; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 15px auto;">
    //               <tbody>
    //                   <tr>
    //                       <td style="padding: 20px;">
    //                           <img src={{{siteLogo}}} style="width: 100px; display: block; margin: auto;" alt="img">
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center;">
    //                       </td>
    //                   </tr>
    //                   <tr>
    //                       <td style="text-align: center;">
    //                           <div style="min-height: 220px; margin-top: 40px; align-items: center; padding: 20px;">
    //                               <h6 style="font-size: 28px; font-weight: 900; letter-spacing: 1.5px; text-align: center; margin-bottom: 35px;">
    //                                   <span style="color: #68E752; display: block;">KYC Received</span>
    //                               </h6>
    //                               <h3 style="color: #ffffff; text-align: center; padding-bottom: 10px;">Hi {{{playerFullName}}}, <br>All Documents received for KYC Verification. Now verification process is started.</span></h3>
    //                           </div>
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center; padding: 15px 20px 15px;">
    //                           <p style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: .5px; text-align: center;">@2023 {{{siteName}}}</p>
    //                       </td>
    //                   </tr>
    //               </tbody>
    //           </table>
    //       </body>

    //       </html>

    //       </html>
    //     `
    //     }),
    //     is_primary: 0,
    //     updated_at: new Date(),
    //     created_at: new Date()
    //   },
    //   {
    //     is_default: true,
    //     type: 12,
    //     label: 'Default Withdraw Processed',
    //     dynamic_data: JSON.stringify(['subject', 'withdrawAmount', 'playerCurrencySymbol', 'transactionId']),
    //     template_code: JSON.stringify({
    //       EN: `

    //       <!DOCTYPE html>
    //       <html lang="en">

    //       <head>
    //           <title>{{{subject}}}</title>

    //           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
    //           <link rel="preconnect" href="https://fonts.googleapis.com">
    //           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    //           <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">

    //           <style>
    //               * {
    //                   box-sizing: border-box;
    //                   padding: 0;
    //                   margin: 0;
    //               }
    //           </style>
    //       </head>

    //       <body>
    //           <table border="0" style="width: 600px; background-color: #201C29; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 15px auto;">
    //               <tbody>
    //                   <tr>
    //                       <td style="padding: 20px;">
    //                           <img src={{{siteLogo}}} style="width: 100px; display: block; margin: auto;" alt="img">
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center;">
    //                       </td>
    //                   </tr>
    //                   <tr>
    //                       <td style="text-align: center;">
    //                           <div style="min-height: 260px; margin-top: 40px; align-items: center; padding: 20px;">
    //                               <h6 style="font-size: 28px; font-weight: 900; letter-spacing: 1.5px; text-align: center; margin-bottom: 35px;">
    //                                   <span style="color: #68E752; display: block;">Congratulation, Withdraw has been credited successfully!</span>
    //                               </h6>
    //                               <h3 style="color: #ffffff; text-align: left; padding-bottom: 10px;">Transaction ID : <span style="color: #57D08A; font-weight: bold;">{{{transactionId}}}</span></h3>
    //                               <h3 style="color: #ffffff; text-align: left; padding-bottom: 10px;">Withdrawal Amount : <span style="color: #57D08A; font-weight: bold;">{{{playerCurrencySymbol}}} {{{withdrawAmount}}}</span></h3>
    //                           </div>
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center; padding: 15px 20px 15px;">
    //                           <p style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: .5px; text-align: center;">@2023 {{{siteName}}}</p>
    //                       </td>
    //                   </tr>
    //               </tbody>
    //           </table>
    //       </body>

    //       </html>
    //       `
    //     }),
    //     is_primary: 0,
    //     updated_at: new Date(),
    //     created_at: new Date()
    //   },
    //   {
    //     is_default: true,
    //     type: 13,
    //     label: 'Default Deposit Success',
    //     dynamic_data: JSON.stringify(['transactionId', 'subject', 'playerCurrencySymbol', 'depositAmount']),
    //     template_code: JSON.stringify({
    //       EN: `
    //       <!DOCTYPE html>
    //       <html lang="en">

    //       <head>
    //           <title>{{{subject}}}</title>

    //           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
    //           <link rel="preconnect" href="https://fonts.googleapis.com">
    //           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    //           <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">

    //           <style>
    //               * {
    //                   box-sizing: border-box;
    //                   padding: 0;
    //                   margin: 0;
    //               }
    //           </style>
    //       </head>

    //       <body>
    //           <table border="0" style="width: 600px; background-color: #201C29; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 15px auto;">
    //               <tbody>
    //                   <tr>
    //                       <td style="padding: 20px;">
    //                           <img src={{{siteLogo}}} style="width: 100px; display: block; margin: auto;" alt="img">
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center;">
    //                       </td>
    //                   </tr>
    //                   <tr>
    //                       <td style="text-align: center;">
    //                           <div style="min-height: 260px; margin-top: 40px; align-items: center; padding: 20px;">
    //                               <h6 style="font-size: 28px; font-weight: 900; letter-spacing: 1.5px; text-align: center; margin-bottom: 35px;">
    //                                   <span style="color: #68E752; display: block;">Amount is deposited successfully, Keep Playing!</span>
    //                               </h6>
    //                               <h3 style="color: #ffffff; text-align: left; padding-bottom: 10px;">Transaction ID : <span style="color: #57D08A; font-weight: bold;">{{{transactionId}}}</span></h3>
    //                               <h3 style="color: #ffffff; text-align: left; padding-bottom: 10px;">Deposit Amount : <span style="color: #57D08A; font-weight: bold;">{{{playerCurrencySymbol}}} {{{depositAmount}}}</span></h3>
    //                           </div>
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center; padding: 15px 20px 15px;">
    //                           <p style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: .5px; text-align: center;">@2023 {{{siteName}}}</p>
    //                       </td>
    //                   </tr>
    //               </tbody>
    //           </table>
    //       </body>

    //       </html>
    //       `
    //     }),
    //     is_primary: 0,
    //     updated_at: new Date(),
    //     created_at: new Date()
    //   },
    //   {
    //     is_default: true,
    //     type: 14,
    //     label: 'Default Deposit Failed',
    //     dynamic_data: JSON.stringify(['transactionId', 'subject', 'playerCurrencySymbol', 'depositAmount']),
    //     template_code: JSON.stringify({
    //       EN: `

    //       <!DOCTYPE html>
    //       <html lang="en">

    //       <head>
    //           <title>{{{subject}}}</title>

    //           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
    //           <link rel="preconnect" href="https://fonts.googleapis.com">
    //           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    //           <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">

    //           <style>
    //               * {
    //                   box-sizing: border-box;
    //                   padding: 0;
    //                   margin: 0;
    //               }
    //           </style>
    //       </head>

    //       <body>
    //           <table border="0" style="width: 600px; background-color: #201C29; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 15px auto;">
    //               <tbody>
    //                   <tr>
    //                       <td style="padding: 20px;">
    //                           <img src={{{siteLogo}}} style="width: 100px; display: block; margin: auto;" alt="img">
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center;">
    //                       </td>
    //                   </tr>
    //                   <tr>
    //                       <td style="text-align: center;">
    //                           <div style="min-height: 260px; margin-top: 40px; align-items: center; padding: 20px;">
    //                               <h6 style="font-size: 28px; font-weight: 900; letter-spacing: 1.5px; text-align: center; margin-bottom: 35px;">
    //                                   <span style="color: #FF1752; display: block;">Your Deposit Request Failed</span>
    //                               </h6>
    //                               <h3 style="color: #ffffff; text-align: left; padding-bottom: 10px;">Transaction ID : <span style="color: #57D08A; font-weight: bold;">{{{transactionId}}}</span></h3>
    //                               <h3 style="color: #ffffff; text-align: left; padding-bottom: 10px;">Deposit Amount : <span style="color: #57D08A; font-weight: bold;">{{{playerCurrencySymbol}}} {{{depositAmount}}}</span></h3>
    //                           </div>
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center; padding: 15px 20px 15px;">
    //                           <p style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: .5px; text-align: center;">@2023 {{{siteName}}}</p>
    //                       </td>
    //                   </tr>
    //               </tbody>
    //           </table>
    //       </body>

    //       </html>
    //       `
    //     }),
    //     is_primary: 0,
    //     updated_at: new Date(),
    //     created_at: new Date()
    //   },
    //   {
    //     is_default: true,
    //     type: 15,
    //     label: 'Default Registration Welcome',
    //     dynamic_data: JSON.stringify(['playerFullName', 'subject', 'siteLoginUrl', 'userName']),
    //     template_code: JSON.stringify({
    //       EN: `
    //       <!DOCTYPE html>
    //       <html lang="en">

    //       <head>
    //           <title>Active User</title>

    //           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
    //           <link rel="preconnect" href="https://fonts.googleapis.com">
    //           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    //           <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">

    //           <style>
    //               * {
    //                   box-sizing: border-box;
    //                   padding: 0;
    //                   margin: 0;
    //               }
    //           </style>
    //       </head>

    //       <body>
    //           <table border="0" style="width: 600px; background-color: #201C29; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 15px auto;">
    //               <tbody>
    //                   <tr>
    //                       <td style="padding: 20px;">
    //                           <img src={{{siteLogo}}} style="width: 100px; display: block; margin: auto;" alt="img">
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center;">
    //                       </td>
    //                   </tr>
    //                   <tr>
    //                       <td style="text-align: center;">
    //                           <div style="min-height: 260px; margin-top: 40px; align-items: center; padding: 20px;">
    //                               <h6 style="font-size: 28px; font-weight: 900; letter-spacing: 1.5px; text-align: center; margin-bottom: 35px;">
    //                                   <span style="color: #68E752; display: block;">Welcome {{{userName}}}</span>
    //                               </h6>
    //                               <h3 style="color: #ffffff; text-align: left; padding-bottom: 10px;">Hello {{{playerFullName}}}</h3>
    //                               <p style="color: #ffffff; letter-spacing: .5px; text-align: left;">Money won is twice as sweet as money earned. Start your Gambling journey with us and win exciting rewards.</p>
    //                               <a style="color: #ffffff;" target="_blank" href={{{siteLoginUrl}}}>
    //                                   <button type="button" style="min-width: 275px; background-color: transparent; border: 3px solid #ffffff; border-radius: 36px; color: #ffffff; font-size: 22px; margin-top: 50px; font-weight: 700; letter-spacing: .5px; cursor: pointer; padding: 12px 30px;">
    //                                       Get Started</button></a>
    //                           </div>
    //                       </td>
    //                   </tr>

    //                   <tr>
    //                       <td style="text-align: center; padding: 15px 20px 15px;">
    //                           <p style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: .5px; text-align: center;">@2023 {{{siteName}}}</p>
    //                       </td>
    //                   </tr>
    //               </tbody>
    //           </table>
    //       </body>

    //       </html>
    //     `
    //     }),
    //     is_primary: 0,
    //     updated_at: new Date(),
    //     created_at: new Date()
    //   },
      {
        is_default: true,
        type: 17,
        label: 'Default Password Updated',
        dynamic_data: JSON.stringify(['playerEmail', 'newPassword', 'siteLoginUrl']),
        template_code: JSON.stringify({
          EN: `
          <!DOCTYPE html>
          <html lang="en">

          <head>
              <title>Password Updated</title>

              <link rel="satylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">

              <style>
                  * {
                      box-sizing: border-box;
                      padding: 0;
                      margin: 0;
                  }
              </style>
          </head>

          <body>
              <table border="0" style="width: 600px; background-color: #201C29; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 15px auto;">
                  <tbody>
                      <tr>
                          <td style="padding: 20px;">
                              <img src={{{siteLogo}}} style="width: 100px; display: block; margin: auto;" alt="img">
                          </td>
                      </tr>

                      <tr>
                          <td style="text-align: center;">
                              <img src="" style="width: 100px; display: block; margin: auto;" alt="img">
                          </td>
                      </tr>
                      <tr>
                          <td style="text-align: center;">
                              <div style="min-height: 280px; align-items: center; padding: 20px;">
                                  <h6 style="font-size: 28px; font-weight: 900; letter-spacing: 1.5px; text-align: center; margin-bottom: 35px;">
                                      <span style="color: #ffffff; display: block;">Password Updated</span>
                                  </h6>
                                  <p style="color: #ffffff; font-size: 15px; font-weight: 400; letter-spacing: 1.5px; margin-bottom: 35px;">That’s okay, It happens. Click on the button below<br> to login.</p>
                                  <p style="color: #ffffff; font-size: 15px; font-weight: 400;">Email - <span style="color: #57D08A; font-weight: bold;">{{{playerEmail}}}</span></p>
                                  <p style="color: #ffffff; font-size: 15px; font-weight: 400; margin-bottom: 25px;">New Password - <span style="color: #57D08A; font-weight: bold;">{{{newPassword}}}</span></p>

                                  <a style="color: #ffffff;" target="_blank" href={{{siteLoginUrl}}}>
                                      <button type="button" style="min-width: 275px; background-color: transparent; border: 3px solid #ffffff; border-radius: 36px; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: .5px; cursor: pointer; padding: 12px 30px;">
                                          Login</button></a>
                              </div>
                          </td>
                      </tr>

                      <tr>
                          <td style="text-align: center; padding: 15px 20px 15px;">
                              <p style="color: #ffffff; font-size: 15px; font-weight: 900; letter-spacing: .5px; text-align: center;">@2023 {{{siteName}}}</p>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </body>

          </html>
        `
        }),
        is_primary: 0,
        updated_at: new Date(),
        created_at: new Date()
      },
    //   {
    //     is_default: true,
    //     type: 18,
    //     label: 'Default Joining Amount',
    //     dynamic_data: JSON.stringify(['userName', 'joiningAmount', 'siteName']),
    //     template_code: JSON.stringify({
    //       EN: `
    //       <!DOCTYPE html>
    //       <html lang="en">
    //       <head>
    //           <title>Congrats - Joining Bonus</title>
    //           <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
    //           <link rel="preconnect" href="https://fonts.googleapis.com">
    //           <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    //           <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jura:wght@500&family=Roboto:wght@100;300;400;500;700;900&family=Style+Script&display=swap">

    //           <style>
    //               * {
    //                   box-sizing: border-box;
    //                   padding: 0;
    //                   margin: 0;
    //               }
    //           </style>
    //       </head>

    //       <body>
    //           <div style="width: 600px; background-color: #f7f9fa; font-family: 'Roboto', sans-serif; color: #ffffff; line-height: 1.4; margin: 15px auto;">
    //               <table border="0" style="width: 600px; background-color: #141432; border-width: 10px; border-style: solid; border-image-slice: 1; border-image-source: linear-gradient(135deg, #5037CD, #FE88FF);">
    //                   <tbody>
    //                       <tr>
    //                           <td style="padding: 16px;">
    //                               <h1 style="background: linear-gradient(135deg, #5037CD, #FE88FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 30px; text-align: center;">TGT Casino</h1>
    //                           </td>
    //                       </tr>

    //                       <tr>
    //                           <td style="background-color: #2c2b69; padding: 24px;">
    //                               <h1 style="color: #57D08A; font-size: 30px; text-align: center; margin-bottom: 32px;">Joining Bonus</h1>

    //                               <div style="display: flex;">
    //                                   <p style="color: #ffffff; font-size: 16px; font-weight: 300; margin-left: 10px;">Congralutions {{userName}},<br> You have recieved Joining Bonus of Amount {{joiningAmount}}.</p>
    //                               </div>
    //                           </td>
    //                       </tr>

    //                       <tr>
    //                           <td style="padding: 16px;">
    //                               <p style="color: #605f9c; font-size: 12px; text-align: center;">@2023 {{{siteName}}}</p>
    //                           </td>
    //                       </tr>
    //                   </tbody>
    //               </table>
    //           </div>
    //       </body>
    //       </html>
    //     `
    //     }),
    //     is_primary: 0,
    //     updated_at: new Date(),
    //     created_at: new Date()
    //   }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('email_templates', null, {})
  }
}
