import { Box } from '@components/Atom/Box';
import { Trash } from '@components/Atom/Icon/icons/Trash';
import { Image } from '@components/Atom/Image';
import { QuantitySelector } from '@components/Atom/QuantitySelector';
import { Typography } from '@components/Atom/Typography';
import useScreenSize from '@hooks/useScreenSize';
import { getIsMobile } from 'src/common/untils/isMobile';
import { Setting } from 'src/constants/setting';
import { CartCardProps } from './type';

const CartCard = ({
  color,
  image,
  name,
  price,
  quantity,
  stock,
  size,
  onRemove,
  onChangeQuantity,
}: CartCardProps) => {
  const responsive = useScreenSize();
  const isMobile = getIsMobile(responsive);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={{
        xs: Setting.DIGIT_12,
        sm: Setting.DIGIT_14,
        md: Setting.DIGIT_16,
      }}
    >
      <Box
        width={{
          sm: Setting.DIGIT_114,
          md: Setting.DIGIT_140,
        }}
        aspectRatio="1 / 1"
        transition="width 0.2s ease-in-out"
        flexShrink={0}
      >
        <Image src={image} borderRadius={Setting.DIGIT_12}></Image>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={{
          sm: Setting.DIGIT_12,
          md: Setting.DIGIT_14,
        }}
        width="50%"
        flexGrow={1}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={{
            sm: Setting.DIGIT_2,
            md: Setting.DIGIT_4,
          }}
          width="100%"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            gap={{
              sm: Setting.DIGIT_4,
              md: Setting.DIGIT_6,
            }}
          >
            <Typography
              variant="h7"
              fontSize={isMobile ? 'base' : 'lg'}
              whiteSpace="nowrap"
              overflow="ellipsis"
            >
              {name}
            </Typography>
            <Box flexGrow={1} display="flex" justifyContent="flex-end">
              <Trash size={isMobile ? 'large' : '2XLarge'} onClick={onRemove} />
            </Box>
          </Box>
          <Box display="flex" flexDirection="column">
            <Typography fontSize={isMobile ? 'xs' : 'sm'} color="#868282">{`Size: ${size}`}</Typography>
            <Typography fontSize={isMobile ? 'xs' : 'sm'} color="#868282">{`Color: ${color}`}</Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={{
            sm: Setting.DIGIT_4,
            md: Setting.DIGIT_6,
          }}
        >
          <Typography variant={'h7'} fontSize={isMobile ? 'base' : 'lg'}>
            ${price}
          </Typography>
          <QuantitySelector quantity={quantity} onChangeQuantity={onChangeQuantity} max={stock} />
        </Box>
      </Box>
    </Box>
  );
};

export { CartCard };
