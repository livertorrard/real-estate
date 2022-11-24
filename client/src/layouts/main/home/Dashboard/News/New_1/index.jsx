import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

export default function New_1(props) {
    return (
        <div className="itemblog">
            <div className="blog_index">
                <div className="myblog">
                    <div className="image-blog-left">
                        <Link className="tag-a" to={`/tin-tuc/${props.new.bv_id}`} >
                            <img src={`http://localhost:4000/public/${props.new?.bv_hinhanh[0]?.abv_hinh}`} data-lazyload="//bizweb.dktcdn.net/thumb/1024x1024/100/336/794/articles/20180615142644-cd98.jpg?v=1540401640587" title="Những lí do đầy thu hút của dự án chung cư New City" alt="" />
                        </Link>
                    </div>
                    <div className="content_blog">
                        <h3 className="h3">
                            <Link to={`/tin-tuc/${props.new?.bv_id}`} className="tag-a" title={props.new.bv_ten}>{props.new.bv_ten}</Link>
                        </h3>
                        <div className="summary_item_blog" >
                            {/* {props.new.bv_mota} */}
                            <div id="motabv" dangerouslySetInnerHTML={{ __html: props.new.bv_mota }}></div>
                        <Link to={`/tin-tuc/${props.new?.bv_id}`} className="tag-a" title="Đọc tiếp">Đọc tiếp</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
