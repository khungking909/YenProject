import { Box } from '@components/Atom/Box';
import { Button } from '@components/Atom/Button';
import { Dialog } from '@components/Atom/Dialog';
import { Rating } from '@components/Atom/Rating';
import { Typography } from '@components/Atom/Typography';
import { ReviewPopup } from '@components/Organism/ReviewPopup';
import useModal from '@hooks/useModal';
import useScreenSize from '@hooks/useScreenSize';
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import { getIsMobile } from 'src/common/untils/isMobile';
import { Setting } from 'src/constants/setting';
import reviewModuleClass from './Review.module.scss';

export function Review({ children }: { children?: React.ReactNode }) {
  const { t } = useTranslation();
  const responsive = useScreenSize();
  const isMobile = getIsMobile(responsive);
  const { openModal, isOpen, closeModal } = useModal();

  return (
    <Box
      className={reviewModuleClass['review']}
      display="flex"
      flexDirection="column"
      gap={{
        sm: '12px',
        md: '16px',
      }}
      pb={{
        sm: Setting.DIGIT_16,
        md: Setting.DIGIT_24,
      }}
    >
      <Dialog open={isOpen} onCloseDialog={closeModal} type="center">
        <ReviewPopup closeModal={closeModal} />
      </Dialog>
      <Typography fontSize="2xl" fontWeight="semibold">
        {t('products.reviews.all_reviews')}
      </Typography>
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={Setting.DIGIT_12}
      >
        <Rating starValue={4.5} title="24 reviews" />
        <Button outline size={isMobile ? 'xSmall' : 'small'} onClick={openModal}>
          {t('products.reviews.write_review')}
        </Button>
      </Box>
      <Box
        display="grid"
        columns={isMobile ? Setting.DIGIT_1 : Setting.DIGIT_2}
        gap={Setting.DIGIT_16}
        flexWrap="wrap"
      >
        {children}
      </Box>
    </Box>
  );
}
