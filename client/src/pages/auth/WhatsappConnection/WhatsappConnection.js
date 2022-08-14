import styles from "./WhatsappConnection.module.scss";
import { connect, useDispatch, useSelector } from "react-redux";
import QRCode from "react-qr-code";
import { menu, settings } from "./svgs";

import { getQr } from "../../../actions/changeQrCode";

const WhatsappConnection = (props) => {
  const dispatch = useDispatch();
  const { error, status, qrCode } = useSelector((state) => state.qrCode);

  const requestQrCodeButton = async () => {
    await dispatch(await props.getQr());
  };

  return (
    <div className={styles.continer}>
      <div className={styles.br_top}>
        <div className={styles.br_top_content}>
          <div className={styles.title_top}>WHATSAAP WEB ROBOT</div>

          <div className={styles.img_continer}>
            <img src={require("../../../assets/images/whatsappRobot.png")} alt="whatsapp" />
          </div>
        </div>
      </div>
      <div className={styles.qr_box}>
        <div className={styles.title}>
          <h1>Whatsapp Connection</h1>
        </div>
        {error && status === "failed" && (
          <div className="text-center text-lg-start mt-4 pt-2">
            <p
              style={{
                color: "red",
                fontSize: "0.9rem",
              }}
            >
              {error}
            </p>
          </div>
        )}
        <div className={styles.qrCode_content}>
          <div className={styles.qrCode_explanation}>
            <div className={styles.landing_title}>To use WhatsApp web robot on your computer:</div>
            <div className={styles.landing_text}>1. Open WhatsApp on your phone</div>
            <div className={styles.landing_text}>
              2. Tap <b>Menu </b> {menu()} or <b>Settings </b> {settings()} and select <b>Linked Devices</b>
            </div>
            <div className={styles.landing_text}>
              3. Tap on <b>Link a Device </b>
            </div>
            <div className={styles.landing_text}>4. Point your phone to this screen to capture the code</div>
          </div>
          <div className={styles.qrCode}>
            {!qrCode ? (
              <div className={styles.spinner}>
                <img style={{ width: "100%", height: "100%" }} src={require("../../../assets/images/Loading.gif")} alt="" />
              </div>
            ) : (
              <QRCode value={qrCode} />
            )}
            {!qrCode && status === "failed" && (
              <div className={styles.requestQrCode_box}>
                <div onClick={() => requestQrCodeButton()} className={styles.requestQrCode_button}>
                  Try again
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    qrCode: state.qrCode,
    userData: state.userData,
  };
};
export default connect(mapStateToProps, { getQr })(WhatsappConnection);
