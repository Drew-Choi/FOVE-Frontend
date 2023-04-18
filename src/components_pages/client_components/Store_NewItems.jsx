import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
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
import SubNav_client from './SubNav_client';
import { useNavigate } from 'react-router-dom';

SwiperCore.use([Navigation]);

export default function Store_NewItems() {
  //네비게이트 리액트Dom 설정
  const navigate = useNavigate();

  //스와이퍼 커스텀
  const [swiperEl, setSwiperEl] = useState(null);
  const [pagination1, setPagination1] = useState('on');
  const [pagination2, setPagination2] = useState('off');
  const [pagination3, setPagination3] = useState('off');
  const [pagination4, setPagination4] = useState('off');

  //카테고리 상품데이터 get
  const [pd_New_Items, setPd_New_Items] = useState([]);

  //상품데이터 db에서 가져오기
  useEffect(() => {
    getCategoryProducts();
  }, []);

  //엑시오스로 모든 상품 정보 요청
  const getCategoryProducts = async () => {
    try {
      const newProductsData = await axios.get(
        `http://localhost:4000/store/new`,
      );
      if (newProductsData.status === 200) {
        await setPd_New_Items(newProductsData.data);
        return newProductsData.data.message;
      } else {
        console.log('실패');
        return newProductsData.data.message;
      }
    } catch (err) {
      console.error(err);
    }
  };

  //db Number타입을 스트링으로 바꾸고 천단위 컴마 찍어 프론트에 보내기
  const country = navigator.language;
  const frontPriceComma = (price) => {
    if (price && typeof price.toLocaleString === 'function') {
      return price.toLocaleString(country, {
        currency: 'KRW',
      });
    } else {
      return price;
    }
  };

  return (
    <main className="store_main">
      <SubNav_client
        onClickEvent1={() => navigate('/store')}
        onClickEvent2={() => navigate('/store/new')}
        onClickEvent3={() => navigate('/store/beanie')}
        onClickEvent4={() => navigate('/store/cap')}
        onClickEvent5={() => navigate('/store/training')}
        onClickEvent6={() => navigate('/store/windbreaker')}
        menu1="VIEW ALL"
        menu2="NEW ARRIVALS"
        menu3="BEANIE"
        menu4="CAP"
        menu5="TRAINING"
        menu6="WINDBREAKER"
        top="70px"
      />
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
              <Row xs={2} md={4} lg={5}>
                {pd_New_Items.map((el, index) => {
                  if (index < 10 && index >= 0)
                    return (
                      <Col
                        onClick={() => navigate(`/store/detail/${el._id}`)}
                        className="store_col"
                        key={el._id}
                      >
                        <Product_client_indiLayout
                          imgFileName={el.img}
                          productName={el.productName}
                          price={frontPriceComma(el.price)}
                        />
                      </Col>
                    );
                })}
              </Row>
            </Container>
          </SwiperSlide>

          <SwiperSlide className="swiper_slide">
            <Container>
              <Row xs={2} md={4} lg={5}>
                {pd_New_Items.map((el, index) => {
                  if (index < 20 && index >= 10)
                    return (
                      <Col
                        onClick={() => navigate(`/store/detail/${el._id}`)}
                        className="store_col"
                        key={el._id}
                      >
                        <Product_client_indiLayout
                          imgFileName={el.img}
                          productName={el.productName}
                          price={frontPriceComma(el.price)}
                        />
                      </Col>
                    );
                })}
              </Row>
            </Container>
          </SwiperSlide>

          <SwiperSlide className="swiper_slide">
            <Container>
              <Row xs={2} md={4} lg={5}>
                {pd_New_Items.map((el, index) => {
                  if (index < 30 && index >= 20)
                    return (
                      <Col
                        onClick={() => navigate(`/store/detail/${el._id}`)}
                        className="store_col"
                        key={el._id}
                        onMouseEnter={() => {}}
                      >
                        <Product_client_indiLayout
                          imgFileName={el.img}
                          productName={el.productName}
                          price={frontPriceComma(el.price)}
                        />
                      </Col>
                    );
                })}
              </Row>
            </Container>
          </SwiperSlide>
        </Swiper>

        <div className="navi_pagi_fix">
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
          </SwiperPaginationContainer>
        </div>
      </section>
      <SubNav_client bottom="25px" />
    </main>
  );
}
