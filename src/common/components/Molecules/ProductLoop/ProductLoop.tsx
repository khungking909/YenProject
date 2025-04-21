import { Box } from '@components/Atom/Box';
import { Image } from '@components/Atom/Image';
import useScreenSize from '@hooks/useScreenSize';
import { useEffect, useRef, useState } from 'react';
import { arrayToString } from 'src/common/untils/arrayToString';
import { getValueFromBreakpoint } from 'src/common/untils/getValueFromBreakpoint';
import { Setting } from 'src/constants/setting';
import { Mousewheel } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import productLoopModuleClass from './ProductLoop.module.scss';
import { ProductLoopProps } from './type';

const ProductLoop = ({
  imageList = [],
  direction = 'horizontal',
  miniSliderPosition = 'left',
}: ProductLoopProps) => {
  const responsive = useScreenSize();
  const swiperRef = useRef<SwiperClass | null>(null); // swiper ref
  const miniSwiperRef = useRef<SwiperClass | null>(null); // swiper ref
  const [currentSlide, setCurrentSlide] = useState(0);

  const onClickMiniSlide = (index: number) => {
    swiperRef.current?.slideTo(index);
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (miniSwiperRef.current) {
      miniSwiperRef.current.slideTo(currentSlide / 2);
    }
  }, [currentSlide]);

  return (
    <Box
      display="flex"
      gap={{
        sm: Setting.DIGIT_8,
        md: Setting.DIGIT_10,
        lg: Setting.DIGIT_12,
      }}
      aspectRatio={direction === 'vertical' ? 'none' : '624 / 600'}
      flexDirection={direction === 'vertical' ? 'column' : 'row'}
      width="100%"
      height="100%"
    >
      <Box
        maxWidth={direction === 'vertical' ? '100%' : 140}
        className={productLoopModuleClass.swiper__left}
        cursor="pointer"
        order={miniSliderPosition === 'right' || direction === 'vertical' ? 1 : 0}
      >
        <Swiper
          spaceBetween={getValueFromBreakpoint(responsive, {
            sm: Setting.DIGIT_8,
            md: Setting.DIGIT_10,
            lg: Setting.DIGIT_12,
          })}
          modules={[Mousewheel]}
          mousewheel={{ forceToAxis: true }}
          slidesPerView={Setting.DIGIT_3}
          direction={direction === 'vertical' ? 'horizontal' : 'vertical'}
          className={productLoopModuleClass.swiper}
          onSwiper={(swiper) => {
            miniSwiperRef.current = swiper;
          }}
        >
          {imageList.map((image, index) => (
            <SwiperSlide
              key={`mini__image ${image}`}
              onClick={() => onClickMiniSlide(index)}
              className={productLoopModuleClass.swiper__mini}
            >
              <Image
                src={image}
                className={arrayToString([
                  productLoopModuleClass.image,
                  index === currentSlide ? productLoopModuleClass.active : '',
                ])}
                objectFit="fill"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box
        width={direction === 'vertical' ? '100%' : '50%'}
        className={productLoopModuleClass.swiper__right}
        aspectRatio={direction === 'vertical' ? 'none' : '450 / 600'}
        cursor="pointer"
      >
        <Swiper
          spaceBetween={1}
          slidesPerView={1}
          className={productLoopModuleClass.swiper}
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.activeIndex);
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {imageList.map((image) => (
            <SwiperSlide key={`main__image ${image}`} className={productLoopModuleClass.swiper__main}>
              <Image src={image} className={productLoopModuleClass.image} objectFit="fill" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export { ProductLoop };
