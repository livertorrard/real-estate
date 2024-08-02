import './index.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { URL_PUBLIC_IMAGES } from 'src/config/configUrl';

export default function New_1(props) {
  return (
    <div className="itemblog">
      <div className="blog_index">
        <div className="myblog">
          <div className="image-blog-left">
            <Link className="tag-a" to={`/tin-tuc/${props.new.id}`}>
              <img
                src={`${URL_PUBLIC_IMAGES + props.new.pictures[0].pictureName}`}
                data-lazyload=""
                title=""
                alt=""
              />
            </Link>
          </div>
          <div className="content_blog">
            <h3 className="h3">
              <Link
                to={`/tin-tuc/${props.new.id}`}
                className="tag-a"
                title={props.new.name}
              >
                {props.new.name}
              </Link>
            </h3>
            <div className="summary_item_blog">
              {/* {props.new.bv_mota} */}
              <div
                id="motabv"
                dangerouslySetInnerHTML={{ __html: props.new.description }}
              ></div>
              <Link
                to={`/tin-tuc/${props.new?.id}`}
                className="tag-a"
                title="Đọc tiếp"
              >
                Đọc tiếp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
