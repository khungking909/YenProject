import logo from '@assets/logo.jpg';
import { Box } from '@components/Atom/Box';
import { Button } from '@components/Atom/Button';
import { Dialog } from '@components/Atom/Dialog';
import { Form } from '@components/Atom/Form';
import { ArrowRight } from '@components/Atom/Icon/icons/ArrowRight';
import { CaretDown } from '@components/Atom/Icon/icons/CaretDown';
import { Cart } from '@components/Atom/Icon/icons/Cart';
import { Login } from '@components/Atom/Icon/icons/Login';
import { Menu } from '@components/Atom/Icon/icons/Menu';
import { Search } from '@components/Atom/Icon/icons/Search';
import { User } from '@components/Atom/Icon/icons/User';
import { IconProps } from '@components/Atom/Icon/type';
import { Image } from '@components/Atom/Image';
import { Input } from '@components/Atom/Input';
import { SelectElement } from '@components/Atom/SelectElement';
import { SelectElements } from '@components/Atom/SelectElements';
import { SelectItem } from '@components/Atom/SelectItem';
import { Typography } from '@components/Atom/Typography';
import { MenuSidebar } from '@components/Molecules/MenuSidebar';
import { Select } from '@components/Molecules/Select';
import { UserDropdown } from '@components/Molecules/UserDropdown';
import { Sidebar } from '@components/Organism/Sidebar';
import { useClickOutsideWhenFocused } from '@hooks/useClickOutsideWhenFocus';
import useModal from '@hooks/useModal';
import useScreenSize from '@hooks/useScreenSize';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useGetCartsQuery } from 'src/app/apis/cartApit';
import { getUserSelector } from 'src/app/slices/authSlice/authSelector';
import { isEmptyObject } from 'src/common/untils/emptyObject';
import { getValueFromBreakpoint } from 'src/common/untils/getValueFromBreakpoint';
import { getIsMobile } from 'src/common/untils/isMobile';
import { ScreenPath } from 'src/constants/screen';
import { Setting } from 'src/constants/setting';

const Header = () => {
  const responsive = useScreenSize();
  const isMobile = getIsMobile(responsive);
  const { t, i18n } = useTranslation();
  const { isOpen, openModal, closeModal } = useModal();
  const user = useSelector(getUserSelector);
  const { data: carts } = useGetCartsQuery();
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeSearch, setActiveSearch] = useState(false);
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [languageActive, setLanguageActive] = useState(false);
  const { ref: selectRef } = useClickOutsideWhenFocused<HTMLDivElement>(() => setLanguageActive(false));
  const [activeLanguage, setActiveLanguage] = useState(Setting.SELECT_LANGUAGE_LIST[0].name);

  useEffect(() => {
    if (isMobile) {
      setActiveMenu(false);
      setActiveSearch(false);
    }
  }, [isMobile, location.pathname]);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isMobile) setActiveSearch(false);
    setSearch('');

    navigate(`/products?search=${search}`);
  };

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language.toLocaleLowerCase());

    setActiveLanguage(language);
    setLanguageActive(false);
  };

  return (
    <Box maxWidth={1440} minWidth={320} m="0 auto" userSelect="none">
      {!isEmptyObject(user) && (
        <Dialog open={isOpen} onCloseDialog={closeModal} type="right">
          <Box width="max-content" height="100vh">
            <Sidebar backgroundColor="white">
              <UserDropdown name={user.username} email={user.email} avatar={user.avatar} />
            </Sidebar>
          </Box>
        </Dialog>
      )}
      <Box
        p={{ sm: '16px 16px', md: '24px 52px' }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap={40}
      >
        <Box display="flex" alignItems="center" gap={16}>
          {isMobile && <Menu size="xLarge" onClick={() => setActiveMenu(!activeMenu)} />}
          <Link to="/">
            <Box width={isMobile ? 40 : 60} height={isMobile ? 40 : 60} borderRadius={'50%'}>
              <Image src={logo} borderRadius={'50%'} />
            </Box>
          </Link>
        </Box>
        {!isMobile && (
          <Box display="flex" gap={{ md: 16, lg: 24 }}>
            <Link to="/">
              <Typography color="#121212" fontWeight="semibold" maxContent>
                {t('home')}
              </Typography>
            </Link>
            <Link to="/products">
              <Typography color="#121212" fontWeight="semibold" maxContent>
                {t('product')}
              </Typography>
            </Link>
            <Link to="/news">
              <Typography color="#121212" fontWeight="semibold" maxContent>
                {t('news')}
              </Typography>
            </Link>
            <Link to="/contact">
              <Typography color="#121212" fontWeight="semibold" maxContent>
                {t('contact')}
              </Typography>
            </Link>
          </Box>
        )}
        {!isMobile && (
          <Box width="100%">
            <Form onSubmit={handleSubmit}>
              <Input
                placeholder={t('search_placeholder')}
                bgColor="gray"
                variant="pill"
                prefix={<Search size="xLarge" color="gray-500" />}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Box>
        )}
        <Box display="flex" gap={{ sm: 12, md: 14 }} alignItems="center" flexShrink={0}>
          {isMobile && <Search size="xLarge" color="dark" onClick={() => setActiveSearch(!activeSearch)} />}
          <Select
            active={languageActive}
            selectorIcon={<CaretDown size={'2XSmall'} color="dark" />}
            value={activeLanguage}
            onClick={() => setLanguageActive(!languageActive)}
            ref={selectRef}
          >
            <SelectElements>
              {Setting.SELECT_LANGUAGE_LIST.map((item) => (
                <SelectElement key={item.id} onClick={() => handleChangeLanguage(item.name)}>
                  <SelectItem value={item.name} />
                </SelectElement>
              ))}
            </SelectElements>
          </Select>
          <Box position={'relative'}>
            <Link to={ScreenPath.CART}>
              <Cart
                size={
                  getValueFromBreakpoint(responsive, {
                    xs: 'large',
                    sm: 'xLarge',
                  }) as IconProps['size']
                }
                color="dark"
              />
            </Link>

            <Box
              position={'absolute'}
              top={-8}
              right={-12}
              backgroundColor={'#ff7979'}
              borderRadius="50%"
              p={isMobile ? '0 6px' : '0 8px'}
            >
              <Typography variant="text" color="white" fontSize="xs" fontWeight="semibold">
                {carts?.items ? carts.items.length : ''}
              </Typography>
            </Box>
          </Box>

          {!isEmptyObject(user) ? (
            <User
              size={
                getValueFromBreakpoint(responsive, {
                  xs: 'large',
                  sm: 'xLarge',
                }) as IconProps['size']
              }
              color="dark"
              onClick={openModal}
            />
          ) : (
            <Link to={ScreenPath.SIGN_IN}>
              <Login
                size={
                  getValueFromBreakpoint(responsive, {
                    xs: 'large',
                    sm: 'xLarge',
                  }) as IconProps['size']
                }
                color="dark"
              />
            </Link>
          )}
        </Box>
      </Box>
      {isMobile && (
        <Box
          maxHeight={activeMenu ? '225px' : '0'}
          transition={'max-height 0.5s ease-in-out'}
          overflow="hidden"
        >
          <MenuSidebar />
        </Box>
      )}
      {isMobile && (
        <Box
          maxHeight={activeSearch ? '50px' : '0'}
          transition={'max-height 0.3s ease-in-out'}
          overflow="hidden"
        >
          <Form onSubmit={handleSubmit}>
            <Box
              p={{ sm: '0 16px 16px', md: '0 52px 24px' }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Input
                placeholder="Search for products"
                prefix={<Search size="xLarge" />}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <Button
                size="xSmall"
                IconLeft={<ArrowRight />}
                color="light"
                roundness="rounded"
                type="submit"
              ></Button>
            </Box>
          </Form>
        </Box>
      )}
    </Box>
  );
};

export { Header };
