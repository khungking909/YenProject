/* eslint-disable @cspell/spellchecker */
import { Box } from '@components/Atom/Box';
import { Button } from '@components/Atom/Button';
import { FooterMenu } from '@components/Atom/FooterMenu';
import { Email } from '@components/Atom/Icon/icons/Email';
import { Facebook } from '@components/Atom/Icon/icons/Facebook';
import { Telegram } from '@components/Atom/Icon/icons/Telegram';
import { ZaloIcon } from '@components/Atom/Icon/icons/Zalo';
import { Image } from '@components/Atom/Image';
import { Input } from '@components/Atom/Input';
import { Typography } from '@components/Atom/Typography';
import useScreenSize from '@hooks/useScreenSize';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getIsMobile } from 'src/common/untils/isMobile';
import { Setting } from 'src/constants/setting';
import logo from '@assets/logo.jpg';

const Footer = () => {
  const responsive = useScreenSize();
  const isMobile = getIsMobile(responsive);
  const { t } = useTranslation();

  return (
    <Box maxHeight={600} position="relative" maxWidth={1440} minWidth={320} m="0 auto">
      <Box
        position="absolute"
        top={0}
        left="50%"
        transform="translateX(-50%)"
        borderRadius={20}
        p={isMobile ? '32px 24px' : '36px 64px'}
        backgroundColor="#000000"
        width="100%"
        maxWidth={isMobile ? Setting.WIDTH_SP : Setting.WIDTH_PC}
        zIndex={1}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={{
            xs: 20,
            sm: 32,
            md: 40,
          }}
          flexDirection={isMobile ? 'column' : 'row'}
        >
          <Box
            maxWidth={550}
            display="flex"
            width={isMobile ? '100%' : '50%'}
            justifyContent="center"
            maxHeight={Setting.DIGIT_90}
            overflow="hidden"
          >
            <Typography variant={isMobile ? 'h5' : 'h4'} color="white" textAlign="center">
              {t('newletter.title')}
            </Typography>
          </Box>
          <Box width="100%" maxWidth={isMobile ? '100%' : 350} display="flex" flexDirection="column" gap={14}>
            <Input
              variant="pill"
              placeholder={t('newletter.placeholder')}
              prefix={<Email size="2XLarge" color="gray-500" />}
              fullWidth
            ></Input>
            <Button roundness="pill" size={isMobile ? 'small' : 'medium'} fullWidth>
              {t('newletter.button')}
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        position={'absolute'}
        top={{
          xs: 140,
          sm: 147,
          md: 95,
        }}
        backgroundColor="#f0f0f0"
        width="100%"
      >
        <Box
          display={isMobile ? 'grid' : 'flex'}
          columns={1}
          justifyContent="space-between"
          width={isMobile ? Setting.WIDTH_SP : Setting.WIDTH_PC}
          mt={{
            xs: 172,
            sm: 180,
            md: 130,
          }}
          m={'0 auto'}
          gap={{
            xs: 20,
            sm: 32,
            md: 60,
            lg: 100,
          }}
          pb={175}
        >
          <Box
            width={300}
            display="flex"
            flexDirection="column"
            gap={{
              xs: 16,
              sm: 24,
            }}
          >
            <Link to="/">
              <Box width={isMobile ? 40 : 60} height={isMobile ? 40 : 60} borderRadius={'50%'}>
                <Image src={logo} borderRadius={'50%'} />
              </Box>
            </Link>
            <Typography variant="text" fontSize="sm" color="#576574">
              {t('footer.description')}
            </Typography>
            <Box display="flex" gap={12}>
              <Link to="/facebook">
                <Facebook size="3XLarge" />
              </Link>
              <Link to="/zalo">
                <ZaloIcon size="3XLarge" />
              </Link>
              <Link to="/telegram">
                <Telegram size="3XLarge" />
              </Link>
            </Box>
          </Box>
          <Box
            display={isMobile ? 'grid' : 'flex'}
            justifyContent="space-between"
            columns={Setting.DIGIT_2}
            rowGap={Setting.DIGIT_24}
            width={'100%'}
          >
            <FooterMenu
              title={t('footer.menu.home').toUpperCase()}
              items={[
                {
                  name: t('footer.menu.home'),
                  url: '/',
                },
                {
                  name: t('footer.menu.services'),
                  url: '/services',
                },
              ]}
            />
            <FooterMenu
              title={t('footer.menu.help').toUpperCase()}
              items={[
                {
                  name: t('footer.menu.about'),
                  url: '/about',
                },
                {
                  name: t('footer.menu.contact'),
                  url: '/contact',
                },
                {
                  name: 'FAQ',
                  url: '/faq',
                },
              ]}
            />
            <FooterMenu
              title={t('footer.menu.company').toUpperCase()}
              items={[
                {
                  name: t('footer.menu.introduce'),
                  url: '/introduce',
                },
                {
                  name: t('footer.menu.personnel'),
                  url: '/personnel',
                },
                {
                  name: t('footer.menu.terms'),
                  url: '/terms-of-use',
                },
                {
                  name: t('footer.menu.blog'),
                  url: '/blog',
                },
                {
                  name: t('footer.menu.privacy'),
                  url: '/privacy-policy',
                },
              ]}
            />
            <FooterMenu
              title={t('footer.menu.contact').toUpperCase()}
              items={[
                {
                  name: '71/22 Nguyễn Tri Phương',
                  url: '#',
                },
                {
                  name: '📞0349002395',
                  url: '#',
                },
              ]}
            />
          </Box>
          <Box
            width={isMobile ? Setting.WIDTH_SP : Setting.WIDTH_PC}
            height={1}
            backgroundColor={'#121212'}
            position={'absolute'}
            bottom={125}
          >
            <Box pt={16}>
              <Typography variant="text" fontSize={isMobile ? 'sm' : 'base'} color="#576574">
                © Version 1.0.0
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { Footer };
