from helper_class.email_class import Email
from lib.database import Database
from lib.config import sender, subject,password
from helper_class.flags import Flags
from helper_class.logger import Logger

FLAGS = Flags()
LEVEL = FLAGS.get_logger_level()
LOGGER = Logger(level=LEVEL) if LEVEL is not None else Logger()
DB = Database("countries.sqlite")

html = """\
<html>
<style>
.container {
  position: relative;
  width: 50%;
}

.image {
  opacity: 1;
  display: block;
  width: 100%;
  height: auto;
  transition: .5s ease;
  backface-visibility: hidden;
}

.middle {
  transition: .5s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
}

.container:hover .image {
  filter: brightness(50%);
  transition: .2s;
}

.container:hover .middle {
  opacity: 1;
}

</style>

<div style="font-size: 12px; font-family: Helvetica, serif, EmojiFont; font-weight: normal; font-style: normal; text-transform: none; text-indent: 0px; background-color: rgb(237, 240, 242); text-decoration: none; white-space: normal; word-spacing: 0px; letter-spacing: normal; font-variant-caps: normal;">
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
                                        <td style="width:56px;border-collapse:collapse;"><img data-imagetype="External" src="https://i.imgur.com/Z5A90af.png" alt="traveling strategy logo" style="font-size:13px;display:block;width:56px;text-decoration:none;border-width:0;border-style:none;outline:none;line-height:13px;"></td>
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
                          <td align="center" valign="middle" bgcolor="#FF8080" role="presentation" style="border-collapse:collapse;border-style:none;border-bottom-right-radius:4px;border-bottom-left-radius:4px;border-top-left-radius:4px;border-top-right-radius:4px;">
                            <a href="https://www.travelingstrategy.com" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" style="color:white;font-size:14px;font-family:Open Sans,Helvetica,Arial,sans serif;font-weight:600;text-transform:none;background-color:#FF8080;display:inline-block;text-decoration:none;margin:0;padding:9px 16px;border-bottom-left-radius:4px;line-height:22.399999618530273px;border-bottom-right-radius:4px;border-top-left-radius:4px;border-top-right-radius:4px;">Visit
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
                                              <td class="container" style="width:600px;border-collapse:collapse;"><img class="image" data-imagetype="External" src="https://content.fortune.com/wp-content/uploads/2019/09/Intrepid-Travel-sri-lanka_dambulla_sigiriya-lion-rock-fortress_group.jpg" style="font-size:13px;display:block;width:246px;height:246px;text-decoration:none;border:1px solid #EEEEEF;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;line-height:13px;outline:none;border-top-left-radius:4px;">
                                                <img class="middle" data-imagetype="External" src="https://img.icons8.com/offices/30/000000/place-marker.png"> Sri Lanka
                                              </a></td>
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
                                              <td class="container" style="width:600px;border-collapse:collapse;"><img class="image" data-imagetype="External" src="https://content.fortune.com/wp-content/uploads/2019/09/1920x1080-Intrepid-Travel-Egypt-Cairo-Pyramids-group-hug-028.jpeg" style="font-size:13px;display:block;width:246px;height:185px;text-decoration:none;border:1px solid #EEEEEF;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;line-height:13px;outline:none;border-top-left-radius:4px;">
                                                  <img class="middle" data-imagetype="External" src="https://img.icons8.com/offices/30/000000/place-marker.png"> Egypt
                                              </a></td>
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
                                                <td class="container" style="width:600px;border-collapse:collapse;"><img class="image" data-imagetype="External" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5e374f9daf874e54c289153c/original.jpg?1580683165" style="font-size:13px;display:block;width:246px;height:139px;text-decoration:none;border:1px solid #EEEEEF;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;line-height:13px;outline:none;border-top-left-radius:4px;">
                                                      <img class="middle" data-imagetype="External" src="https://img.icons8.com/offices/30/000000/place-marker.png" atl="logo from icons8.com"> Netherlands
                                                </a></td>
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
                                                  <td class="container" style="width:600px;border-collapse:collapse;"><img class="image" data-imagetype="External" src="https://content.fortune.com/wp-content/uploads/2019/09/Intrepid-Travel-Peru_Inca_trail_machu_picchu_trek_015.jpg" style="font-size:13px;display:block;width:246px;height:139px;text-decoration:none;border:1px solid #EEEEEF;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;line-height:13px;outline:none;border-top-left-radius:4px;">
                                                      <img class="middle" data-imagetype="External" src="https://img.icons8.com/offices/30/000000/place-marker.png"> Peru
                                                  </a></td>
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
                                                  <td class="container" style="width:600px;border-collapse:collapse;"><img class="image" data-imagetype="External" src="https://content.fortune.com/wp-content/uploads/2019/09/Intrepid-Travel-Peregrine-Adventures-THAILAND_KO-SURIN-TAI_BEACH50.jpg" style="font-size:13px;display:block;width:246px;height:246px;text-decoration:none;border:1px solid #EEEEEF;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;line-height:13px;outline:none;border-top-left-radius:4px;">
                                                      <img class="middle" data-imagetype="External" src="https://img.icons8.com/offices/30/000000/place-marker.png"> Thailand
                                                  </a></td>
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
                                                    <td class="container" style="width:600px;border-collapse:collapse;"><img class="image" data-imagetype="External" src="https://content.fortune.com/wp-content/uploads/2019/09/Intrepid-Travel-Portugal-Lisbon-043-4.jpg" style="font-size:13px;display:block;width:246px;height:185px;text-decoration:none;border:1px solid #EEEEEF;border-top-right-radius:4px;border-bottom-right-radius:12px;border-bottom-left-radius:4px;line-height:13px;outline:none;border-top-left-radius:4px;">
                                                        <img class="middle" data-imagetype="External" src="https://img.icons8.com/offices/30/000000/place-marker.png"> Lisbon
                                                    </a></td>
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
                        <td colspan="3" style="border-collapse:collapse;">
                          <table bgcolor="white" cellspacing="0" cellpadding="0" style="width:600px;border-collapse:collapse;border-bottom-right-radius:8px;border-bottom-left-radius:8px;border-top-left-radius:0px;border-top-right-radius:0px;">
                            <tbody><tr>
                              <td height="36" style="border-collapse:collapse;">&nbsp;</td>
                            </tr>
                          </tbody></table>
                        </td>
                      </tr>
                      <tr>
                        <td height="24" style="border-collapse:collapse;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td width="24" style="border-collapse:collapse;">&nbsp;</td>
                          <td style="border-collapse:collapse;">
                            <div align="center" style="color: rgb(86, 90, 93); font-size: 14px; font-family: &quot;Open Sans&quot;, Helvetica, Arial, &quot;sans serif&quot;, serif, EmojiFont; line-height: 22.4px;">
                              You are receiving this email because you signed up to Traveling Strategy.</div>
                          </td>
                        <td width="24" style="border-collapse:collapse;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td height="24" colspan="3" style="border-collapse:collapse;border-bottom:1px solid #DDE1E3;">
                        &nbsp;</td>
                      </tr>
                      <tr>
                        <td height="24" style="border-collapse:collapse;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td width="24" style="border-collapse:collapse;">&nbsp;</td>
                          <td style="border-collapse:collapse;">
                            <div align="center" style="color: rgb(86, 90, 93); font-size: 14px; font-family: &quot;Open Sans&quot;, Helvetica, Arial, &quot;sans serif&quot;, serif, EmojiFont; line-height: 22.4px;">
                              <span>Travel smarter and safer from Traveling Strategy</span><span>&nbsp;</span><img data-imagetype="External" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5e0190dc6a8d637c8dd20cff/original.png?1577160924" alt="love" style="text-decoration:none;border-width:0;outline:none;line-height:14px;"><span>&nbsp;</span><br>

                            <span>TravelingStrategy®</span>,<span>&nbsp;</span><span>Concordia university, Montreal, Canada</span></div>
                          </td>
                        <td width="24" style="border-collapse:collapse;">&nbsp;</td>
                      </tr>
                      <tr>
                        <td colspan="3" style="border-collapse:collapse;">
                          <table align="center" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
                            <tbody><tr>
                              <th><a href="https://www.travelingstrategy.com">Visit
                              travelingstrategy.com</a></th>
                                <th width="16"></th>
                              <th><a href="">Unsubscribe</a></th>
                            </tr>
                          </tbody></table>
                        </td>
                      </tr>
                      <tr>
                        <td height="16" style="border-collapse:collapse;"></td>
                      </tr>
                      <tr>
                        <td align="center" colspan="3" style="border-collapse:collapse;">
                          <table border="0" cellspacing="0" cellpadding="0" style="font-size:13px;font-family:Helvetica,Arial,sans-serif;width:144px;border-collapse:collapse;table-layout:auto;line-height:22px;">
                            <tbody><tr>
                              <th width="24"><a href="" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" style="color:#0E1318;display:block;text-decoration:underline;line-height:0;"><img data-imagetype="External" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5e01866c167e920348c59e1f/original.png?1577158252" alt="facebook" style="text-decoration:none;border-width:0;outline:none;line-height:13px;"></a></th>
                              <th width="16"></th>
                              <th width="24"><a href="" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" style="color:#0E1318;display:block;text-decoration:underline;line-height:0;"><img data-imagetype="External" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5e01866ccda48838c1473107/original.png?1577158252" alt="twitter" style="text-decoration:none;border-width:0;outline:none;line-height:13px;"></a></th>
                              <th width="16"></th>
                              <th width="24"><a href="" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" style="color:#0E1318;display:block;text-decoration:underline;line-height:0;"><img data-imagetype="External" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5e01866daf874e03968b2978/original.png?1577158253" alt="pinterest" style="text-decoration:none;border-width:0;outline:none;line-height:13px;"></a></th>
                              <th width="16"></th>
                              <th width="24"><a href="" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" style="color:#0E1318;display:block;text-decoration:underline;line-height:0;"><img data-imagetype="External" src="https://appboy-images.com/appboy/communication/assets/image_assets/images/5e01866d5b99ac6f6aaa44d0/original.png?1577158253" alt="instagram" style="text-decoration:none;border-width:0;outline:none;line-height:13px;"></a></th>
                              <th width="16"></th>
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
</div>

</html>
"""

LOGGER.info(f'Getting information from table subscribers.')
subscribers = DB.get_items("subscribers")
for user in subscribers:
      LOGGER.info(f'Sending email to {user}.')
      recipient = user[0]
      email = Email(subject, sender, recipient, html)
      email.sendEmail(password)