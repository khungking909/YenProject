import { Box } from '@components/Atom';
import { Setting } from 'src/constants/setting';
import loadingModuleClass from './Loading.module.scss';
import { LoadingProps } from './type';

const Loading = ({ loadingType = 'spinner' }: LoadingProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor="rgba(0, 0, 0, 0.02)"
      gap={{
        xs: loadingType === 'dots' ? Setting.DIGIT_6 : Setting.DIGIT_0,
        sm: loadingType === 'dots' ? Setting.DIGIT_8 : Setting.DIGIT_0,
        md: loadingType === 'dots' ? Setting.DIGIT_10 : Setting.DIGIT_0,
      }}
    >
      <Box className={loadingModuleClass[loadingType]}></Box>
      {loadingType === 'dots' && (
        <>
          <Box className={loadingModuleClass[loadingType]}></Box>
          <Box className={loadingModuleClass[loadingType]}></Box>
        </>
      )}
    </Box>
  );
};

export { Loading };
