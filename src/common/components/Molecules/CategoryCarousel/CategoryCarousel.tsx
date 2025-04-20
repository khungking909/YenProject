import { Box } from '@components/Atom/Box';
import { OutstandingCard } from '@components/Atom/OutstandingCard';
import { Typography, TypographyProps } from '@components/Atom/Typography';
import { Navigation } from '@components/Molecules/Navigation';
import useScreenSize from '@hooks/useScreenSize';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getValueFromBreakpoint } from 'src/common/untils/getValueFromBreakpoint';
import { getIsMobile } from 'src/common/untils/isMobile';
import { Setting } from 'src/constants/setting';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import categoryCarouselModuleClass from './CategoryCarousel.module.scss';
import { CategoryCarouselProps } from './type';

const CategoryCarousel = ({ outstandingList = [], title }: CategoryCarouselProps) => {
  const responsive = useScreenSize();
  const isMobile = getIsMobile(responsive);
  const swiperRef = useRef<SwiperClass | null>(null); // swiper ref
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(currentSlide); // slide to current page
    }
  }, [currentSlide]);

  return (
    <Box
      m="0 auto"
      p={{
        xs: 16,
        sm: '24px 16px',
        md: 32,
        lg: 52,
      }}
      maxWidth={1440}
      minWidth={320}
      display="flex"
      flexDirection="column"
      gap={{
        xs: 14,
        sm: 16,
        md: 32,
      }}
      userSelect="none"
    >
      <Box display="flex" alignItems="center" justifyContent={!isMobile ? 'space-between' : 'center'}>
        <Typography
          variant={
            getValueFromBreakpoint(responsive, {
              xs: 'h6',
              sm: 'h5',
            }) as TypographyProps['variant']
          }
        >
          {title}
        </Typography>
        {!isMobile && (
          <Navigation
            currentPage={currentSlide < Setting.DIGIT_3 ? currentSlide + 1 : Setting.DIGIT_3}
            totalVisiblePage={Setting.DIGIT_3}
            totalPage={Setting.DIGIT_3}
            onClickNavigationItem={(page) => setCurrentSlide(page - 1)}
          />
        )}
      </Box>
      <Swiper
        spaceBetween={getValueFromBreakpoint(responsive, {
          xs: 16,
          sm: 24,
          md: 32,
        })}
        slidesPerView="auto"
        className={categoryCarouselModuleClass['full__width']}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {outstandingList.map((item) => (
          <SwiperSlide key={item.name} className={categoryCarouselModuleClass['swiper__slide']}>
            <Link to={`/product/${item.slug}`} key={item.name}>
              <OutstandingCard zoomScale name={item.name} image={item.image} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export { CategoryCarousel };
