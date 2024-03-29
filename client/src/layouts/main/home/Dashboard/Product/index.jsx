import React from 'react';
import { Link } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './index.scss';
import { fCurrency } from 'src/utils/formatNumber';

export default function Product(props) {
  const product_img_1 = '/images/product_img_1.png';
  const product_img_2 = '/images/product_img_2.png';
  const product_img_3 = '/images/product_img_3.png';
  const img_watch_360 = '/images/img_watch_360.png';
  return (
    <div className="product-box product-item-main product-item-compare">
      <div className="product-thumbnail">
        <Link
          className="image_thumb p_img"
          to={`/products/${props.product.id}`}
          title={props.product.name}
        >
          <img
            style={{ width: '800px', height: '250px' }}
            src={`http://localhost:3005/public/images/${props.product.pictures[0].pictureName}`}
            alt="Cho thuê căn hộ, biệt thự cao cấp"
          />
        </Link>
        {/* <div className="label_thumb">
                    <div className="wrap_lable">
                        {props.product?.notes.map((value, index) => {
                            let style_css = '';
                            switch(value.toLowerCase()) {
                                case 'cho thuê':
                                    style_css = 'thue';
                                    break;
                                case 'bán':
                                    style_css = 'ban';
                                    break;
                                default:
                                    style_css = 'hot';
                              }
                            return (<span key={index} className={`lb ${style_css}`}>{value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}</span>)
                        })}	
                    </div>
                </div> */}
        <Link
          to={`/products/${props.product?.id}`}
          title="Dự án hỗ trợ xem ảnh 360 độ"
          className="degrees"
        >
          <img src={img_watch_360} alt="Tin 306 độ" />
        </Link>
      </div>
      <div className="product-info product-bottom mh">
        <h3 className="product-name">
          <Link
            to={`/products/${props.product?.id}`}
            title={props.product.name}
          >
            {props.product.name}
          </Link>
        </h3>
        <div className="tag_mix section">
          <ul className="padding-0">
            <li>
              <span>
                <LocationOnIcon className="icon-map-marker" />
                &nbsp;
              </span>
              <span>{props.product.address}</span>
            </li>
          </ul>
        </div>
        <div className="tag_mix section">
          <ul className="padding-0">
            <li>
              <a
                className="inIcon contact"
                id="phoneCallProduct"
                href={`tel: ${props.product.author.phone}`}
                title="Gọi ngay"
              >
                <LocalPhoneIcon
                  sx={{ fontSize: 15 }}
                  id="iconPhoneProduct"
                ></LocalPhoneIcon>
                {props.product.author.phone}
              </a>
            </li>
          </ul>
        </div>
        <div className="section" id="wrapperPriceProduct">
          <div className="group_contact"></div>
          <div className="blockprice">
            <div className="product-item-price price-box">
              <span className="special-price">
                <span className="price product-price">
                  Giá: {fCurrency(props.product.price)}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="section bottom_extentions">
        <ul>
          <li>
            <span>
              <img src={product_img_1} alt="Giường ngủ" />
              &nbsp;{props.product.bedRoom} Ngủ
            </span>
          </li>
          <li>
            <span>
              <img
                src={product_img_2}
                data-lazyload="//bizweb.dktcdn.net/100/336/794/themes/692935/assets/bath.png?1638695199389"
                alt="Phòng tắm"
              />
              &nbsp;{props.product.toilet} Tắm
            </span>
          </li>
          <li>
            <span>
              <img src={product_img_3} alt="Diện tích" />
              &nbsp;{props.product.area}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
