import './index.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { URL_PUBLIC_IMAGES } from 'src/config/configUrl';

export default function New_2(props) {
  return (
    <div class="news-2">
      <div className="myblog">
        <div className="image-blog-left">
          <Link className="tag-a" to={`/tin-tuc/${props.new?.id}`}>
            <img
              src={`${URL_PUBLIC_IMAGES + props.new.pictures[0]?.pictureName}`}
              data-lazyload=""
              title=""
              alt=""
            />
          </Link>
        </div>
        <div className="content_blog">
          <span className="time_post">
            <i className="fa fa-calendar-check"></i>&nbsp;{props.new?.createdAt}
            &nbsp;
          </span>
          <Stack sx={{ width: '100%' }}>
            <h3 className="h3">
              <Link className="tag-a" to={`/tin-tuc/${props.new?.id}`}>
                {props.new?.name}
              </Link>
            </h3>
          </Stack>
        </div>
      </div>
    </div>
  );
}
