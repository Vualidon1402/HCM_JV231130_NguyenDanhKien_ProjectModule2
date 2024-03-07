import React from "react";
import "./footer.scss";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  return (
    <div>
      <div className="red_line">
        <div className="footer_container">
          <div className="footer_above">
            <div className="footer_above_item">
              <img
                src="https://cdn-crownx.winmart.vn/images/prod/162964655378716287682220181-1--og.png"
                alt="img"
              />
            </div>
            <div className="footer_above_item">
              <img
                src="https://cdn-crownx.winmart.vn/images/prod/162964658411816287682628462-1--og.png"
                alt="img"
              />
            </div>
            <div className="footer_above_item">
              <img
                src="https://cdn-crownx.winmart.vn/images/prod/162964661464516287682943943-1--og.png"
                alt="img"
              />
            </div>
            <div className="footer_above_item">
              <img
                src="https://cdn-crownx.winmart.vn/images/prod/162964665580516292779811154-1--og.png"
                alt="img"
              />
            </div>
          </div>
          <div className="footer_center">
            <div className="footer_center_1">
              <img
                style={{ width: "150px", height: "50px" }}
                src="https://winmart.vn/_next/static/images/logo_2-8e4bc984a7825a60badf7e30635a264d.png"
                alt="img"
              />
              <div className="footer_center_1_text">
                Công Ty Cổ Phần Dịch Vụ Thương Mại Tổng Hợp WinCommerce
              </div>
              <div className="footer_center_1_text">
                Mã số doanh nghiệp: 0104918404 Đăng ký lần đầu ngày 20 tháng 09
                năm 2010, đăng ký thay đổi lần thứ 48, ngày 30 tháng 06 năm 2023
              </div>
              <img
                style={{ width: "150px", height: "50px" }}
                src="https://winmart.vn/_next/static/images/logoSaleNoti-f3d3b02c52d6144889ea6a5cbc6f0f19.png"
                alt="img"
              />
            </div>
            <div className="footer_center_2">
              <div className="footer_center_2_title">Về chúng tôi</div>
              <a href="/" className="footer_center_2_text">
                Giới thiệu về WinMart
              </a>
              <br />
              <a href="/" className="footer_center_2_text">
                Danh sách cửa hàng
              </a>
              <br />
              <a href="/" className="footer_center_2_text">
                Chính sách bảo mật
              </a>
              <br />
              <a href="/" className="footer_center_2_text">
                Quản lý chất lượng
              </a>
              <br />
              <a href="/" className="footer_center_2_text">
                Điều khoản và điều kiện giao dịch
              </a>
            </div>
            <div className="footer_center_3">
              <div className="footer_center_3_title">Hỗ trợ khách hàng</div>
              <a href="/" className="footer_center_3_text">
                Trung tâm hỗ trợ khách hàng
              </a>
              <br />
              <a href="/" className="footer_center_3_text">
                Chính sách giao hàng
              </a>
              <br />
              <a href="/" className="footer_center_3_text">
                Chính sách thanh toán
              </a>
              <br />
              <a href="/" className="footer_center_3_text">
                Chính sách đổi trả
              </a>
              <br />
              <a href="/" className="footer_center_3_text">
                Đánh giá góp ý
              </a>
              <br />
              <a href="/" className="footer_center_3_text">
                Danh sách trúng thưởng
              </a>
            </div>
            <div className="footer_center_4">
              <div className="footer_center_4_title">Chăm sóc khách hàng</div>
              <a href="/" className="footer_center_4_text">
                Mua online: 0123456789
              </a>
              <br />
              <a href="/" className="footer_center_4_text">
                Email: WinMartcity@gmail.com
              </a>
              <div className="footer_center_4_title">Kết nối với chúng tôi</div>
              <a href="/" className="footer_center_4_text">
                <YouTubeIcon />
              </a>
              <a href="/" className="footer_center_4_text">
                <FacebookIcon />
              </a>
            </div>
          </div>
          <div className="footer_bot">
            <div className="footer_bot_1">
              <div className="footer_bot_1_title">
                Địa chỉ giao dịch Hà Nội:
              </div>
              <div className="footer_bot_1_text">
                Công Ty Cổ Phần Dịch Vụ Thương Mại Tổng Hợp WinCommerce
              </div>
              <div className="footer_bot_1_text">
                Tầng 6, Toà nhà trung tâm Quốc tế, số 17 Ngô Quyền, Phường Tràng
                Tiền, Quận Hoàn Kiếm, Thành Phố Hà Nội
              </div>
            </div>
            <div className="footer_bot_2">
              <div className="footer_bot_2_title">Trụ sở chính:</div>
              <div className="footer_bot_2_text">
                Công Ty Cổ Phần Dịch Vụ Thương Mại Tổng Hợp WinCommerce
              </div>
              <div className="footer_bot_2_text">
                Số 23 Lê Duẩn, Phường Bến Nghé, Quận 1, Thành phố Hồ Chí Minh,
                Việt Nam
              </div>
            </div>
            <div className="footer_bot_3">
              <div className="footer_bot_3_title">
                Địa chỉ giao dịch Tp.HCM:
              </div>
              <div className="footer_bot_3_text">
                Công Ty Cổ Phần Dịch Vụ Thương Mại Tổng Hợp WinCommerce
              </div>
              <div className="footer_bot_3_text">
                Tầng 12, Tòa nhà Mplaza SaiGon, số 39 Lê Duẩn, Phường Bến Nghé,
                Quận 1, TP Hồ Chí Minh, Việt Nam
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
