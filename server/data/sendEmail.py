from helper_class.email_class import Email
from lib.database import Database


sender = "390soen@gmail.com"
subject = "Test Email"
password = "390minicapstone"

html = """\
<html>

<div style="max-width:600px;margin:0 auto;">
  <table align="center" border="0" cellspacing="0" cellpadding="0" role="presentation" style="width:600px;border-collapse:collapse;">
    <tbody><tr>
      <td align="center" valign="top" style="font-size:0;direction:ltr;border-collapse:collapse;padding:0;">
        <div align="left" style="font-size:13px;vertical-align:top;display:inline-block;direction:ltr;width:600px;max-width:100%;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:collapse;">
            <tbody><tr>
              <td valign="top" style="border-collapse:collapse;padding:0;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:collapse;">
                  <tbody><tr>
                    <td align="left" style="font-size:0;border-collapse:collapse;padding:0;word-break:break-word;">
                      <table border="0" cellspacing="0" cellpadding="0" style="font-size:13px;font-family:Helvetica,Arial,sans-serif;width:600px;border-collapse:collapse;table-layout:auto;line-height:22px;">
                        <tbody><tr>
                          <td style="border-collapse:collapse;">
                            <table cellspacing="0" cellpadding="0" style="display:block;border-collapse:collapse;">
                              <tbody><tr>
                                <td height="16" style="border-collapse:collapse;line-height:16px;">&nbsp;</td>
                              </tr>
                              </tbody></table>
                              <table bgcolor="white" cellspacing="0" cellpadding="0" style="width:600px;border-collapse:collapse;border-bottom-right-radius:0px;border-bottom-left-radius:0px;border-top-left-radius:8px;border-top-right-radius:8px;">
                                <tbody><tr>
                                  <td height="46" style="border-collapse:collapse;">&nbsp;</td>
                                </tr>
                                </tbody></table>
                          </td>
                        </tr>
                        </tbody></table>
                    </td>
                  </tr>
                  </tbody></table>
              </td>
            </tr>
            </tbody></table>
        </div>
      </td>
    </tr>
  </tbody></table>
</div>



<div style="background-color:white;max-width:600px;margin:0 auto;">
  <table align="center" bgcolor="white" border="0" cellspacing="0" cellpadding="0" role="presentation" style="width:600px;border-collapse:collapse;">
    <tbody><tr>
      <td align="center" valign="top" style="font-size:0;direction:ltr;border-collapse:collapse;padding:0;">
        <div align="left" style="font-size:13px;vertical-align:top;display:inline-block;direction:ltr;width:600px;max-width:100%;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:collapse;">
            <tbody><tr>
              <td valign="top" style="border-collapse:collapse;padding:0;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:collapse;">
                  <tbody><tr>
                    <td align="left" style="font-size:0;border-collapse:collapse;padding:0;word-break:break-word;">
                      <table border="0" cellspacing="0" cellpadding="0" style="font-size:13px;font-family:Helvetica,Arial,sans-serif;width:600px;border-collapse:collapse;table-layout:auto;line-height:22px;">
                        <tbody><tr>
                          <th style="width:48px;">&nbsp;</th>
                            <th>
                              <table border="0" cellspacing="0" cellpadding="0" style="font-size:13px;font-family:Helvetica,Arial,sans-serif;width:125.91px;border-collapse:collapse;table-layout:auto;line-height:22px;">
                                <tbody><tr>
                                  <th width="56" height="56">
                                    <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-spacing:0;border-collapse:collapse;">
                                      <tbody><tr>
                                        <td style="width:56px;border-collapse:collapse;"><img src="/data/logo.png" alt="canva" style="font-size:13px;display:block;width:56px;text-decoration:none;border-width:0;border-style:none;outline:none;line-height:13px;"></td>
                                      </tr>
                                      </tbody></table>
                                  </th>
                                  <th width="16">&nbsp;</th>
                                    <th>
                                      <div align="left" style="color: rgb(14, 19, 24); font-size: 14px; font-family: "Open Sans", Helvetica, Arial, sans-serif, serif, EmojiFont; font-weight: bold; line-height: 1.6;">
                                      </div>
                                    </th>
                                </tr>
                                </tbody></table>
                            </th>
                            <th align="right" valign="middle"><span style="color:#0E1318;font-size:14px;font-weight:bold;padding:0 0 4px 0;"></span><span>Traveling Newsletter<span>&nbsp;</span></span><span style="color:#6E7174;font-size:14px;font-weight:normal;">- Traveling Guide</span></th>
                              <th style="width:48px;">&nbsp;</th>
                        </tr>
                        <tr>
                          <th colspan="4" style="height:36px;">&nbsp;</th>
                        </tr>
                        </tbody></table>
                    </td>
                  </tr>
                  </tbody></table>
                </td>
              </tr>
              </tbody></table>
            </div>
          </td>
    </tr>
    </tbody></table>
</div>



<div style="background-color:white;max-width:600px;margin:0 auto;">
    <table align="center" bgcolor="white" border="0" cellspacing="0" cellpadding="0" role="presentation" style="width:600px;border-collapse:collapse;">
      <tbody><tr>
        <td align="center" valign="top" style="font-size:0;direction:ltr;border-collapse:collapse;padding:12px 0;">
          <div align="left" style="font-size:13px;vertical-align:top;display:inline-block;direction:ltr;width:600px;max-width:100%;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:collapse;">
              <tbody><tr>
                <td valign="top" style="border-collapse:collapse;padding:0;">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:collapse;">
              <tbody><tr>
                <td align="left" style="font-size:0;border-collapse:collapse;padding:0 48px 8px 48px;word-break:break-word;">
                  <div align="left" style="color: rgb(14, 19, 24); font-size: 32px; font-family: "Open Sans", Helvetica, Arial, "sans serif", serif, EmojiFont; font-weight: 700; line-height: 41.6px; letter-spacing: -0.5px;">
                  TRAVEL OUTSIDE THE BOX</div>
                </td>
              </tr>
              <tr>
                <td align="left" style="font-size:0;border-collapse:collapse;padding:8px 48px 0 48px;word-break:break-word;">
                  <div align="left" style="color: rgb(86, 90, 93); font-size: 14px; font-family: &quot;Open Sans&quot;, Helvetica, Arial, &quot;sans serif&quot;, serif, EmojiFont; line-height: 22.4px;">
                  “Travel isn’t always pretty. It isn’t always comfortable. Sometimes it hurts, it even breaks your heart. But that’s okay. The journey changes you; it should change you. It leaves marks on your memory,
                  on your consciousness, on your heart, and on your body. You take something with you. Hopefully, you leave something good behind.” – Anthony Bourdain<br>

                  <br>

                  Through traveling, you learn that the only perfect time is now. Life is short and the world is wide.</div>
                </td>
              </tr>
              </tbody></table>
            </td>
            </tr>
            </tbody></table>
          </div>
        </td>
      </tr>
    </tbody></table>
</div>


<div style="background-color:white;max-width:600px;margin:0 auto;">
  <table align="center" bgcolor="white" border="0" cellspacing="0" cellpadding="0" role="presentation" style="width:600px;border-collapse:collapse;">
    <tbody><tr>
      <td align="center" valign="top" style="font-size:0;direction:ltr;border-collapse:collapse;padding:0;">
        <div align="left" style="font-size:13px;vertical-align:top;display:inline-block;direction:ltr;width:600px;max-width:100%;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:collapse;">
            <tbody><tr>
              <td valign="top" style="border-collapse:collapse;padding:0;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:collapse;">
                  <tbody><tr>
                    <td align="left" style="font-size:0;border-collapse:collapse;padding:12px 48px;word-break:break-word;">
                      <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:separate;line-height:0px;">
                        <tbody><tr>
                          <td align="center" valign="middle" bgcolor="#00C4CC" role="presentation" style="border-collapse:collapse;border-style:none;border-bottom-right-radius:4px;border-bottom-left-radius:4px;border-top-left-radius:4px;border-top-right-radius:4px;">
                            <a href="https://www.travelingstrategy.com" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" style="color:white;font-size:14px;font-family:Open Sans,Helvetica,Arial,sans serif;font-weight:600;text-transform:none;background-color:#00C4CC;display:inline-block;text-decoration:none;margin:0;padding:9px 16px;border-bottom-left-radius:4px;line-height:22.399999618530273px;border-bottom-right-radius:4px;border-top-left-radius:4px;border-top-right-radius:4px;">Visit
                            website</a></td>
                        </tr>
                        </tbody></table>
                    </td>
                    </tr>
                    </tbody></table>
              </td>
            </tr>
          </tbody></table>
        </div>
      </td>
    </tr>
  </tbody></table>
</div>

<div style="background-color:white;max-width:600px;margin:0 auto;">
  <table align="center" bgcolor="white" border="0" cellspacing="0" cellpadding="0" role="presentation" style="width:600px;border-collapse:collapse;">
    <tbody><tr>
      <td align="center" valign="top" style="font-size:0;direction:ltr;border-collapse:collapse;padding:12px 0;">
        <div align="left" style="font-size:13px;vertical-align:top;display:inline-block;direction:ltr;width:600px;max-width:100%;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:collapse;">
            <tbody><tr>
              <td valign="top" style="border-collapse:collapse;padding:0;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-collapse:collapse;">
                  <tbody><tr>
                    <td align="left" style="font-size:0;border-collapse:collapse;padding:0;word-break:break-word;">
                      <table border="0" cellspacing="0" cellpadding="0" style="font-size:13px;font-family:Helvetica,Arial,sans-serif;width:600px;border-collapse:collapse;table-layout:auto;line-height:22px;">
                        <tbody><tr>
                          <th style="width:48px;">&nbsp;</th>
                            <th>
                              <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                                <tbody><tr>
                                  <th>
                                    <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                                      <tbody><tr>
                                        <th>
                                          <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-spacing:0;border-collapse:collapse;">
                                            <tbody><tr>
                                              <td style="width:600px;border-collapse:collapse;"><img data-imagetype="External" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5e326c36c2b47753401d5ecd/original.jpg?1580362806" title="Couple on a chair" style="font-size:13px;display:block;width:244px;text-decoration:none;border:1px solid #EEEEEF;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;line-height:13px;outline:none;border-top-left-radius:4px;"></a></td>
                                            </tr>
                                          </tbody></table>
                                        </th>
                                      </tr>
                                      <tr>
                                        <th height="16" style="line-height:0;">&nbsp;</th>
                                      </tr>
                                      <tr>
                                        <th>
                                          <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-spacing:0;border-collapse:collapse;">
                                            <tbody><tr>
                                              <td style="width:600px;border-collapse:collapse;"><img data-imagetype="External" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5e326c367b648d3c87f4411c/original.jpg?1580362806" alt="Love" style="font-size:13px;display:block;width:244px;text-decoration:none;border:1px solid #EEEEEF;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;line-height:13px;outline:none;border-top-left-radius:4px;"></a></td>
                                            </tr>
                                          </tbody></table>
                                        </th>
                                      </tr>
                                        <tr>
                                          <th height="16" style="line-height:0;">&nbsp;</th>
                                        </tr>
                                        <tr>
                                          <th>
                                            <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-spacing:0;border-collapse:collapse;">
                                              <tbody><tr>
                                                <td style="width:600px;border-collapse:collapse;"><img data-imagetype="External" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5e374f9daf874e54c289153c/original.jpg?1580683165" alt="Young couple" style="font-size:13px;display:block;width:244px;text-decoration:none;border:1px solid #EEEEEF;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;line-height:13px;outline:none;border-top-left-radius:4px;"></a></td>
                                              </tr>
                                            </tbody></table>
                                          </th>
                                        </tr>
                                      </tbody></table>
                                    </th>
                                    <th width="16">&nbsp;</th>
                                      <th>
                                        <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                                          <tbody><tr>
                                            <th>
                                              <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-spacing:0;border-collapse:collapse;">
                                                <tbody><tr>
                                                  <td style="width:600px;border-collapse:collapse;"><img data-imagetype="External" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5e326c36af874e7b2a890a8c/original.jpg?1580362806" alt="Smiling Couple" style="font-size:13px;display:block;width:244px;text-decoration:none;border:1px solid #EEEEEF;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;line-height:13px;outline:none;border-top-left-radius:4px;"></a></td>
                                                </tr>
                                              </tbody></table>
                                            </th>
                                          </tr>
                                          <tr>
                                            <th height="16" style="line-height:0;">&nbsp;</th>
                                          </tr>
                                          <tr>
                                            <th>
                                              <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-spacing:0;border-collapse:collapse;">
                                                <tbody><tr>
                                                  <td style="width:600px;border-collapse:collapse;"><img data-imagetype="External" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5e326c36cb832c05ef698686/original.jpg?1580362806" alt="Woman and dog" style="font-size:13px;display:block;width:244px;text-decoration:none;border:1px solid #EEEEEF;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;line-height:13px;outline:none;border-top-left-radius:4px;"></a></td>
                                                </tr>
                                              </tbody></table>
                                            </th>
                                            </tr>
                                            <tr>
                                              <th height="16" style="line-height:0;">&nbsp;</th>
                                            </tr>
                                            <tr>
                                              <th>
                                                <table border="0" cellspacing="0" cellpadding="0" role="presentation" style="border-spacing:0;border-collapse:collapse;">
                                                  <tbody><tr>
                                                    <td style="width:600px;border-collapse:collapse;"><img data-imagetype="External" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5e326c36cda48821d4b7d9e9/original.jpg?1580362806" alt="Man and woman smiling" style="font-size:13px;display:block;width:244px;text-decoration:none;border:1px solid #EEEEEF;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;line-height:13px;outline:none;border-top-left-radius:4px;"></a></td>
                                                  </tr>
                                                </tbody></table>
                                              </th>
                                            </tr>
                                          </tbody></table>
                                        </th>
                                      </tr>
                                    </tbody></table>
                                  </th>
                                  <th style="width:48px;">&nbsp;</th>
                                </tr>
                              </tbody></table>
                            </td>
                          </tr>
                        </tbody></table>
                      </td>
                </tr>
              </tbody></table>
         </div>
      </td>
    </tr>
  </tbody></table>
</div>

</html>
"""

db = Database("countries.sqlite")
subscribers = db.get_items("subscribers")
for user in subscribers:
      recipient = user[0]
      email = Email(subject, sender, recipient, html)
      email.sendEmail(password)