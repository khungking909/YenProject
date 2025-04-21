import { Badge } from '@components/Atom/Badge';
import { Box } from '@components/Atom/Box';
import { BreadCrumb } from '@components/Atom/BreadCrumb';
import { Button } from '@components/Atom/Button';
import { QuantitySelector } from '@components/Atom/QuantitySelector';
import { Rating } from '@components/Atom/Rating';
import { SwatchesColor } from '@components/Atom/SwatchesColor';
import { SwatchesSize } from '@components/Atom/SwatchesSize';
import { TabItem } from '@components/Atom/TabItem';
import { Tabs } from '@components/Atom/Tabs';
import { Typography, TypographyProps } from '@components/Atom/Typography';
import { ProductCard } from '@components/Molecules/ProductCard';
import { ProductLoop } from '@components/Molecules/ProductLoop';
import { ReviewCard } from '@components/Molecules/ReviewCard';
import { TabPanel } from '@components/Molecules/TabPanel';
import { Carousel } from '@components/Organism/Carousel';
import { Loading } from '@components/Organism/Loading';
import useScreenSize from '@hooks/useScreenSize';
import { Description } from '@pages/ProductDetail/components/Description';
import { Review } from '@pages/ProductDetail/components/Review';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { useAddCartItemMutation } from 'src/app/apis/cartApit';
import { useGetProductByIdQuery, useGetProductsQuery } from 'src/app/apis/productApi';
import { useGetReviewByProductSlugQuery } from 'src/app/apis/reviewApi';
import { useToast } from 'src/app/slices/toastSlice/toastSelector';
import { getValueFromBreakpoint } from 'src/common/untils/getValueFromBreakpoint';
import { getIsMobile } from 'src/common/untils/isMobile';
import { ScreenPath } from 'src/constants/screen';
import { Setting } from 'src/constants/setting';
import { ProductResponse } from 'src/types';

export default function ProductDetail() {
  const responsive = useScreenSize();
  const params = useParams<{ slug: string }>();
  const isMobile = getIsMobile(responsive);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const TAB_LIST = [t('products.description'), t('products.review'), 'FQAs'];
  const { data: productsData } = useGetProductsQuery();
  const data = Array.isArray(productsData) ? productsData : [];
  const { data: productData, isLoading, isFetching } = useGetProductByIdQuery(params.slug ?? '');
  const [activeSize, setActiveSize] = useState('');
  const [activeColor, setActiveColor] = useState('');
  const [addCartItem] = useAddCartItemMutation();
  const [quantity, setQuantity] = useState(Setting.DIGIT_1);
  const { onShowToast } = useToast();
  const { data: reviewsData } = useGetReviewByProductSlugQuery(params.slug ?? '');
  const reviews = Array.isArray(reviewsData) ? reviewsData : [];

  const saleBadgeSize = useMemo(() => {
    return isMobile ? 'medium' : 'large';
  }, [isMobile]);

  const finalPrice = (salePrice: number = 0, price: number) => {
    return salePrice ? price - salePrice : price;
  };

  const salePriceValue = (salePrice: number = 0, price: number) => {
    if (!salePrice || salePrice === 0) return;

    return Number((salePrice / price) * Setting.DIGIT_100);
  };

  const handleAddToCart = () => {
    addCartItem({
      id: productData?.id ?? '',
      quantity: quantity,
      name: productData?.name ?? '',
      price: productData?.price ?? 0,
      image: productData?.images[0] ?? '',
      color: activeColor,
      size: activeSize,
      stock: productData?.stock ?? 0,
    });

    onShowToast({
      message: t('carts.add_cart_success', { name: productData?.name }),
      type: 'success',
      title: t('successfully'),
      position: 'top-right',
    });
  };

  const handleAddToCartOutstanding = (product: ProductResponse) => {
    addCartItem({
      id: product.id,
      quantity: Setting.DIGIT_1,
      name: product.name,
      price: finalPrice(product.price, product.salePrice),
      image: product.images[0],
      color: activeColor,
      size: activeSize,
      stock: product.stock,
    });

    onShowToast({
      message: t('carts.add_cart_success', { name: product.name }),
      type: 'success',
      title: t('successfully'),
      position: 'top-right',
    });
  };

  useEffect(() => {
    if (productData) {
      setActiveSize(productData.size?.[0]?.name ?? '');
      setActiveColor(productData.color?.[0]?.name ?? '');
    }
  }, [productData]);

  return (
    <Box
      maxWidth={1440}
      minWidth={320}
      m="0 auto"
      pb={{
        sm: Setting.DIGIT_40,
        md: Setting.DIGIT_80,
      }}
    >
      {isLoading || isFetching ? (
        <Loading loadingType="dots" />
      ) : (
        <Box width={isMobile ? Setting.WIDTH_SP : Setting.WIDTH_PC} m="0 auto">
          <Box width="100%" backgroundColor="#576574" height={2}></Box>
          <Box p={isMobile ? '16px 0' : '24px 0'} cursor="pointer">
            <BreadCrumb>
              <Link to={ScreenPath.HOME}>
                <Typography variant="text" color="gray">
                  {t('home')}
                </Typography>
              </Link>
              <Link to={ScreenPath.PRODUCT}>
                <Typography variant="text" color="gray">
                  {t('product')}
                </Typography>
              </Link>
              <Link to="/product/1">
                <Typography variant="text" color="black" fontWeight="semibold">
                  {productData?.category}
                </Typography>
              </Link>
            </BreadCrumb>
          </Box>

          <Box
            width="100%"
            display="flex"
            flexDirection={isMobile ? 'column' : 'row'}
            gap={{
              sm: Setting.DIGIT_16,
              md: Setting.DIGIT_32,
              lg: Setting.DIGIT_40,
            }}
            pb={{
              sm: Setting.DIGIT_40,
              md: Setting.DIGIT_80,
            }}
          >
            <Box
              flexShrink={Setting.DIGIT_0}
              width={isMobile ? '100%' : '50%'}
              display="flex"
              flexDirection={isMobile ? 'column' : 'row'}
            >
              <ProductLoop
                imageList={productData?.images ?? []}
                direction={isMobile ? 'vertical' : 'horizontal'}
              />
            </Box>
            <Box
              flexGrow={Setting.DIGIT_1}
              display="flex"
              flexDirection="column"
              gap={{
                sm: Setting.DIGIT_16,
                md: Setting.DIGIT_24,
              }}
            >
              <Box display="flex" flexDirection="column" gap={Setting.DIGIT_12}>
                <Typography
                  variant={
                    getValueFromBreakpoint(responsive, {
                      sm: 'h5',
                      md: 'h4',
                    }) as TypographyProps['variant']
                  }
                >
                  {productData?.name}
                </Typography>
                <Rating starValue={productData?.rating} />
                <Box
                  display="flex"
                  alignItems="center"
                  gap={{
                    xs: Setting.DIGIT_4,
                    sm: Setting.DIGIT_8,
                    md: Setting.DIGIT_12,
                  }}
                >
                  <Typography
                    fontSize={
                      getValueFromBreakpoint(responsive, {
                        xs: 'sm',
                        sm: 'sm',
                        md: 'base',
                      }) as TypographyProps['fontSize']
                    }
                    fontWeight="semibold"
                  >
                    ${finalPrice(productData?.salePrice, Number(productData?.price)).toFixed(2)}
                  </Typography>
                  {productData?.salePrice && (
                    <Typography
                      fontSize={
                        getValueFromBreakpoint(responsive, {
                          xs: 'sm',
                          sm: 'sm',
                          md: 'base',
                        }) as TypographyProps['fontSize']
                      }
                      color="gray"
                      textDecoration="line-through"
                    >
                      ${Number(productData?.price)?.toFixed(2)}
                    </Typography>
                  )}
                  <Badge color="danger" size={saleBadgeSize} roundness="pill">
                    -
                    {salePriceValue(productData?.salePrice, Number(productData?.price))?.toFixed(0) +
                      Setting.PERCENTAGE_SYMBOL}
                  </Badge>
                </Box>
              </Box>
              <Box pb={Setting.DIGIT_8}>
                <Typography fontSize={isMobile ? 'sm' : 'base'} color="gray">
                  {productData?.shortDescription}
                </Typography>
              </Box>
              <Box width="100%" backgroundColor="gray" height={1}></Box>
              <Box
                display="inline-flex"
                justifyContent="center"
                width="100%"
                flexDirection={'column'}
                gap={{
                  sm: Setting.DIGIT_12,
                  md: Setting.DIGIT_16,
                }}
              >
                <Box
                  display="inline-flex"
                  flexDirection="column"
                  width="max-content"
                  gap={{
                    sm: Setting.DIGIT_12,
                    md: Setting.DIGIT_16,
                  }}
                >
                  <Typography fontSize="sm" color="gray">
                    {t('products.color')}
                  </Typography>
                  <Box
                    display="flex"
                    width="max-content"
                    gap={{
                      sm: Setting.DIGIT_12,
                      md: Setting.DIGIT_16,
                    }}
                  >
                    {productData?.color.map((color) => (
                      <SwatchesColor
                        key={color.name}
                        color={color.value}
                        onClick={() => setActiveColor(color.name)}
                        active={activeColor === color.name}
                      />
                    ))}
                  </Box>
                </Box>
                <Box
                  width="100%"
                  height={1}
                  backgroundColor="gray"
                  m={{
                    sm: '6px 0',
                    md: '12px 0',
                  }}
                ></Box>
                <Box
                  display="inline-flex"
                  flexDirection="column"
                  width="max-content"
                  gap={{
                    sm: Setting.DIGIT_12,
                    md: Setting.DIGIT_16,
                  }}
                >
                  <Typography fontSize="sm" color="gray">
                    {t('products.size')}
                  </Typography>
                  <Box
                    display="flex"
                    width="max-content"
                    gap={{
                      sm: Setting.DIGIT_12,
                      md: Setting.DIGIT_16,
                    }}
                  >
                    {productData?.size.map((size) => (
                      <SwatchesSize
                        key={size.name}
                        sizeValue={size.name}
                        onClick={() => setActiveSize(size.name)}
                        active={activeSize === size.name}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box width="100%" backgroundColor="gray" height={1}></Box>
              <Box
                display="flex"
                flexDirection={isMobile ? 'column' : 'row'}
                gap={Setting.DIGIT_16}
                flexWrap="wrap"
              >
                <QuantitySelector
                  quantity={Setting.DIGIT_1}
                  max={productData?.stock}
                  onChangeQuantity={(value) => setQuantity(value)}
                />
                <Button fullWidth={isMobile} roundness="pill" color="dark" onClick={handleAddToCart}>
                  {t('products.add_to_cart')}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" flexDirection="column" gap={Setting.DIGIT_24}>
            <Tabs value={activeTab} onChangeTab={setActiveTab}>
              {TAB_LIST.map((tab, index) => (
                <TabItem key={tab} active={activeTab === index} title={tab} />
              ))}
            </Tabs>
            <TabPanel tabPanelIndex={0} activeTab={activeTab}>
              <Description />
            </TabPanel>
            <TabPanel tabPanelIndex={1} activeTab={activeTab}>
              <Review>
                {reviews.map((item) => (
                  <ReviewCard
                    key={item.id}
                    rate={item.rating}
                    review={item.content}
                    date={item.createdAt}
                    image={item.User.avatar}
                    name={item.User.username}
                  ></ReviewCard>
                ))}
              </Review>
            </TabPanel>
            <TabPanel tabPanelIndex={2} activeTab={activeTab}>
              <Typography textAlign="center">{t('products.faq')}</Typography>
            </TabPanel>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap={{
              sm: Setting.DIGIT_24,
              md: Setting.DIGIT_32,
            }}
            pt={{
              sm: Setting.DIGIT_16,
              md: Setting.DIGIT_24,
            }}
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant={isMobile ? 'h5' : 'h3'} textAlign="center">
              {t('products.suggestions').toUpperCase()}
            </Typography>
            <Box width="100%">
              <Carousel
                slidesPerView={Number(
                  getValueFromBreakpoint(responsive, {
                    sm: Setting.DIGIT_2,
                    md: Setting.DIGIT_4,
                  }),
                )}
                spaceBetween={Number(
                  getValueFromBreakpoint(responsive, {
                    sm: Setting.DIGIT_8,
                    md: Setting.DIGIT_16,
                  }),
                )}
                navigation={!isMobile}
                navigationColor="info"
              >
                {data.map((item) => {
                  return (
                    <Link to={`/product/${item.slug}`} key={item.id}>
                      <ProductCard
                        columns={4}
                        image={item.images[0]}
                        name={item.name}
                        price={item.price}
                        salePrice={item.salePrice}
                        rate={item.rating}
                        onClickAddToCart={() => handleAddToCartOutstanding(item)}
                      />
                    </Link>
                  );
                })}
              </Carousel>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}
