import './index.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';

export default function New_2(props) {
  return (
    <div class="news-2">
      <div className="myblog">
        <div className="image-blog-left">
          <Link className="tag-a" to={`/tin-tuc/${props.new?.id}`}>
            <img
              src={`http://localhost:4000/public/`}
              data-lazyload="//bizweb.dktcdn.net/thumb/1024x1024/100/336/794/articles/20180615142644-cd98.jpg?v=1540401640587"
              title="Những lí do đầy thu hút của dự án chung cư New City"
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
