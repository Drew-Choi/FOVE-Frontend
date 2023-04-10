import React, { useEffect, useRef, useState } from 'react';
import '../../styles/store_client.scss';
import Product_client_indiLayout from './Product_client_indiLayout';
import { Container, Row, Col } from 'react-bootstrap';
import SwiperCore, { Navigation, Pagination, A11y, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SwiperPaginationBTN from '../../styles/SwiperPaginationBTN';
import SwiperPaginationContainer from '../../styles/SwiperPaginationContainer';

SwiperCore.use([Navigation]);

export default function Store_client() {
  const [swiperEl, setSwiperEl] = useState(null);
  const [pagination1, setPagination1] = useState('on');
  const [pagination2, setPagination2] = useState('off');
  const [pagination3, setPagination3] = useState('off');
  const [pagination4, setPagination4] = useState('off');

  return (
    <main className="client_main">
      <nav>
        <ul>
          <li>VIEW ALL</li>
          <li>NEW ARRIVALS</li>
          <li>BEANIE</li>
          <li>HAT</li>
          <li>MUFFLER</li>
        </ul>
      </nav>
      <section className="product_display">
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, A11y, Mousewheel]}
          spaceBetween={50}
          slidesPerView={1}
          // navigation={true}
          // pagination={{ clickable: true }}
          onSwiper={(swiper) => setSwiperEl((cur) => swiper)}
          // onSlideChange={() => console.log('slide change')}
          onActiveIndexChange={(swiper) => {
            swiper.activeIndex !== 0
              ? setPagination1((cur) => 'off')
              : setPagination1((cur) => 'on');
            swiper.activeIndex !== 1
              ? setPagination2((cur) => 'off')
              : setPagination2((cur) => 'on');
            swiper.activeIndex !== 2
              ? setPagination3((cur) => 'off')
              : setPagination3((cur) => 'on');
            swiper.activeIndex !== 3
              ? setPagination4((cur) => 'off')
              : setPagination4((cur) => 'on');
          }}
          mousewheel={false}
          className="swiper_container"
        >
          <SwiperSlide className="swiper_slide">
            <Container>
              <Row>
                <Col>
                  <Product_client_indiLayout />
                </Col>
                <Col>
                  <Product_client_indiLayout />
                </Col>
                <Col>
                  <Product_client_indiLayout />
                </Col>
                <Col>
                  <Product_client_indiLayout />
                </Col>
                <Col>
                  <Product_client_indiLayout />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Product_client_indiLayout />
                </Col>
                <Col>
                  <Product_client_indiLayout />
                </Col>
                <Col>
                  <Product_client_indiLayout />
                </Col>
                <Col>
                  <Product_client_indiLayout />
                </Col>
                <Col>
                  <Product_client_indiLayout />
                </Col>
              </Row>
            </Container>
          </SwiperSlide>
          <SwiperSlide className="swiper_slide">Slide 2</SwiperSlide>
          <SwiperSlide className="swiper_slide">Slide 3</SwiperSlide>
          <SwiperSlide className="swiper_slide">Slide 4</SwiperSlide>
        </Swiper>
        <div className="swiper_navigation_container">
          <SwiperPaginationBTN
            color="gray"
            hoverColor="lightgray"
            className="nav_arrow_pre"
            onClickEvent={() => swiperEl.slidePrev()}
          >
            〈
          </SwiperPaginationBTN>
          <SwiperPaginationBTN
            color="gray"
            hoverColor="lightgray"
            className="nav_arrow_next"
            onClickEvent={() => swiperEl.slideNext()}
          >
            〉
          </SwiperPaginationBTN>
        </div>

        <SwiperPaginationContainer className="swiper_pagination_container">
          <SwiperPaginationBTN
            className={`pagi1 ${pagination1}`}
            color="gray"
            hoverColor="lightgray"
            onClickEvent={() => swiperEl.slideTo(0)}
          >
            1
          </SwiperPaginationBTN>
          <SwiperPaginationBTN
            className={`pagi2 ${pagination2}`}
            color="gray"
            hoverColor="lightgray"
            onClickEvent={() => swiperEl.slideTo(1)}
          >
            2
          </SwiperPaginationBTN>
          <SwiperPaginationBTN
            className={`pagi3 ${pagination3}`}
            color="gray"
            hoverColor="lightgray"
            onClickEvent={() => swiperEl.slideTo(2)}
          >
            3
          </SwiperPaginationBTN>
          <SwiperPaginationBTN
            className={`pagi4 ${pagination4}`}
            color="gray"
            hoverColor="lightgray"
            onClickEvent={() => swiperEl.slideTo(3)}
          >
            4
          </SwiperPaginationBTN>
        </SwiperPaginationContainer>
      </section>
    </main>
  );
}
