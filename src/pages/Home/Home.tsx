import image from '@assets/yen.jpg';
import image2 from '@assets/yen2.jpg';
import image4 from '@assets/yen4.jpg';
import { Box } from '@components/Atom/Box';
import { Typography } from '@components/Atom/Typography';
import { CategoryCarousel } from '@components/Molecules/CategoryCarousel';
import { FeatureSection } from '@components/Organism/FeatureSection';
import { Loading } from '@components/Organism/Loading';
import { Slider } from '@components/Organism/Slider';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetProductsQuery } from 'src/app/apis/productApi';

export default function Home() {
  const { t } = useTranslation();
  const { data = [], isLoading, isFetching } = useGetProductsQuery();

  const productOutstanding = useMemo(() => {
    return data
      .map((item) => {
        return {
          name: item.name,
          image: item.images[0],
          slug: item.slug,
        };
      })
      .sort(() => Math.random() - 0.5);
  }, [data]);

  return (
    <>
      <Box
        height={{
          xs: 400,
          sm: 500,
        }}
      >
        <Slider imageList={[image, image2, image4]} autoPlay autoPlaySpeed={5000} />
      </Box>
      {isLoading || isFetching ? (
        <Loading loadingType="dots" />
      ) : (
        <CategoryCarousel outstandingList={productOutstanding} title={t('outstanding')} />
      )}
      <FeatureSection>
        <Box display="flex" flexDirection="column" gap={4} width="100%" overflow="hidden">
          <Typography fontSize="3xl" variant="h3">
            {t('feature_products.about')}
          </Typography>
          <Typography fontSize="lg">{t('feature_products.description')}</Typography>
        </Box>
      </FeatureSection>
    </>
  );
}
