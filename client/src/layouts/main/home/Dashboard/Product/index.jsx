import React from 'react';
import { Link } from 'react-router-dom';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';


import './index.scss';
import { fCurrency } from 'src/utils/formatNumber';


export default function Product(props) {
    // const { product} = props;
    // console.log(product, "product")
    // console.log( props.product.sp_hinhanh[0]?.ha_hinh, 'rong', "trung anh aaaaaaaaaaaaaa")
    const product_img_1 = '/images/product_img_1.png';
    const product_img_2 = '/images/product_img_2.png';
    const product_img_3 = '/images/product_img_3.png';
    const img_watch_360 = '/images/img_watch_360.png';
    return (
        <div className="product-box product-item-main product-item-compare">
            <div className="product-thumbnail" >
                <Link className="image_thumb p_img" to={`/san-pham/${props.product?.sp_id}`} title={props.product.sp_ten}>	
                    <img style={{width: "800px", height: "250px"}} src={ props?.product ? 'http://localhost:4000/public/'+ props?.product?.sp_hinhanh[0]?.ha_hinh : ''} alt="Cho thuê căn hộ, biệt thự cao cấp"/>
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
                <Link to={`/san-pham/${props.product?.sp_id}`} title="Dự án hỗ trợ xem ảnh 360 độ" className="degrees">
                    <img src={img_watch_360}   alt="Tin 306 độ"/>
                </Link>	
            </div>
            <div className="product-info product-bottom mh">
                <h3 className="product-name">
                    <Link to={`/san-pham/${props.product?.sp_id}`}  title={props.product.sp_ten}>{props.product.sp_ten}</Link>
                </h3>
                <div className="tag_mix section">
                    <ul className="padding-0">
                        <li><span><LocationOnIcon className="icon-map-marker" />&nbsp;</span><span>{props.product.sp_thanhpho}</span></li>
                    </ul>
                </div>
                <div className="tag_mix section">
                    <ul className="padding-0">
                        <li>
                            <a className="inIcon contact" id="phoneCallProduct" href="tel:0123456789" title="Gọi ngay"><LocalPhoneIcon sx={{fontSize: 15}} id="iconPhoneProduct" ></LocalPhoneIcon>{props.product.tg_phone}</a> 
                        </li>
                    </ul>
                </div>
                <div className="section" id='wrapperPriceProduct'>
                    <div className="group_contact">
                    </div>
                    <div className="blockprice">
                        <div className="product-item-price price-box">
                            <span className="special-price">
                                <span className="price product-price">
                                 Giá: {fCurrency(props.product.sp_gia)}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section bottom_extentions">
                <ul>
                    <li><span><img src={product_img_1} alt="Giường ngủ"/>&nbsp;{props.product.sp_phongngu} Ngủ</span></li>
                    <li><span><img src={product_img_2}  data-lazyload="//bizweb.dktcdn.net/100/336/794/themes/692935/assets/bath.png?1638695199389" alt="Phòng tắm"/>&nbsp;{props.product.sp_phongwc} Tắm</span></li>
                    <li><span><img src={product_img_3} alt="Diện tích"/>&nbsp;{props.product.sp_dientich}</span></li>
                </ul>
            </div>
        </div>
    );
}
