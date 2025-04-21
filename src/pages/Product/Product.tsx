import { Box } from '@components/Atom/Box';
import { BreadCrumb } from '@components/Atom/BreadCrumb';
import { ChevronDown } from '@components/Atom/Icon/icons/ChevronDown';
import { ProductCell } from '@components/Atom/ProductCell';
import { SelectElement } from '@components/Atom/SelectElement';
import { SelectElements } from '@components/Atom/SelectElements';
import { SelectItem } from '@components/Atom/SelectItem';
import { ToolbarSection } from '@components/Atom/ToolbarSection';
import { Typography } from '@components/Atom/Typography';
import { Pagination } from '@components/Molecules/Pagination/Pagination';
import { ProductCard } from '@components/Molecules/ProductCard';
import { Select } from '@components/Molecules/Select';
import { Loading } from '@components/Organism/Loading';
import { useClickOutsideWhenFocused } from '@hooks/useClickOutsideWhenFocus';
import useScreenSize from '@hooks/useScreenSize';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import { useAddCartItemMutation } from 'src/app/apis/cartApit';
import { useGetProductsQuery } from 'src/app/apis/productApi';
import { useToast } from 'src/app/slices/toastSlice/toastSelector';
import { getIsMobile } from 'src/common/untils/isMobile';
import { sortByNewest } from 'src/common/untils/sortByNewest';
import { sortByOldest } from 'src/common/untils/sortByOldest';
import { sortByPriceHighToLow } from 'src/common/untils/sortByPriceHighToLow';
import { sortByPriceLowToHigh } from 'src/common/untils/sortByPriceLowToHigh';
import { ScreenPath } from 'src/constants/screen';
import { Setting } from 'src/constants/setting';
import { ProductResponse } from 'src/types';

export default function Product() {
  const [sortByActive, setSortByActive] = useState(false);
  const responsive = useScreenSize();
  const isMobile = getIsMobile(responsive);
  const { t } = useTranslation();
  const { ref: selectRef } = useClickOutsideWhenFocused<HTMLDivElement>(() => setSortByActive(false));
  const [toolbarActive, setToolbarActive] = useState(isMobile ? Setting.DIGIT_2 : Setting.DIGIT_4);
  const toolbarTotal = isMobile ? Setting.DIGIT_2 : Setting.DIGIT_5;
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const [activePage, setActivePage] = useState(currentPage);
  const {
    data: productData,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    page: activePage,
    limit: Setting.LIMIT_PRODUCT,
  });
  const data = Array.isArray(productData) ? productData : [];
  const [addCartItem] = useAddCartItemMutation();
  const { onShowToast } = useToast();

  const SELECT_ITEM_LIST = [
    {
      id: 1,
      name: t('products.sort_by_options.newest'),
    },
    {
      id: 2,
      name: t('products.sort_by_options.oldest'),
    },
    {
      id: 3,
      name: t('products.sort_by_options.price_asc'),
    },
    {
      id: 4,
      name: t('products.sort_by_options.price_desc'),
    },
  ];

  const getSortedProducts = () => {
    switch (selectSortBy) {
      case SELECT_ITEM_LIST[0].name:
        return sortByNewest(data);
      case SELECT_ITEM_LIST[1].name:
        return sortByOldest(data);
      case SELECT_ITEM_LIST[2].name:
        return sortByPriceLowToHigh(data);
      case SELECT_ITEM_LIST[3].name:
        return sortByPriceHighToLow(data);
      default:
        return data;
    }
  };

  const [selectSortBy, setSelectSortBy] = useState(SELECT_ITEM_LIST[0].name);

  const finalPrice = (price: number = 0, salePrice: number) => {
    return salePrice ? price - salePrice : price;
  };

  const onClickToolbarItem = (id: number) => {
    setToolbarActive(id);
  };

  const searchByName = (name: string, products: ProductResponse[]) => {
    if (!name || name === '') return products;

    return products.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()));
  };

  useEffect(() => {
    if (isMobile) {
      setToolbarActive(Setting.DIGIT_2);
    }

    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);

      if (search) {
        newParams.set('search', search);
      } else {
        newParams.delete('search');
      }

      if (activePage) {
        newParams.set('page', String(activePage));
      } else {
        newParams.delete('page');
      }

      return newParams;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, isMobile, search, setSearchParams]);

  const handleOnClickAddToCart = (product: ProductResponse) => {
    addCartItem({
      id: product.id,
      quantity: Setting.DIGIT_1,
      name: product.name,
      price: finalPrice(product.price, product.salePrice),
      image: product.images[0],
      stock: product.stock,
      color: product.color[0].name,
      size: product.size[0].name,
    });

    onShowToast({
      message: t('carts.add_cart_success', { name: product.name }),
      type: 'success',
      title: t('successfully'),
      position: 'top-right',
    });
  };

  return (
    <Box maxWidth={1440} minWidth={320} m="0 auto">
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
              <Typography variant="text" color="black" fontWeight="semibold">
                {t('product')}
              </Typography>
            </Link>
          </BreadCrumb>
        </Box>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={{
            sm: '0',
            md: '24px',
          }}
        >
          <Box
            display="flex"
            gap={Setting.DIGIT_8}
            alignItems={isMobile ? 'flex-start' : 'center'}
            justifyContent="space-between"
            width="100%"
            flexDirection={isMobile ? 'column' : 'row'}
          >
            <Typography variant="h7">{t('products.casual')}</Typography>
            <Select
              active={sortByActive}
              selectorTitle={t('products.sort_by') + ' : '}
              selectorIcon={<ChevronDown size={isMobile ? 'small' : 'medium'} />}
              value={selectSortBy}
              onClick={() => setSortByActive(!sortByActive)}
              ref={selectRef}
            >
              <SelectElements>
                {SELECT_ITEM_LIST.map((item) => (
                  <SelectElement key={item.id} onClick={() => setSelectSortBy(item.name)}>
                    <SelectItem value={item.name} />
                  </SelectElement>
                ))}
              </SelectElements>
            </Select>
          </Box>
          <ToolbarSection
            selected={toolbarActive}
            total={toolbarTotal}
            onClickItem={(id) => onClickToolbarItem(id)}
          />
        </Box>
        {isLoading || isFetching ? (
          <Loading loadingType="spinner" />
        ) : (
          <Box
            p={{
              xs: '16px 0',
              sm: '24px 0',
              md: '32px 0',
            }}
            m="0 auto"
            display="grid"
            columns={toolbarActive}
            gap={{
              sm: '16px',
              md: '24px',
            }}
          >
            {searchByName(search.trim(), getSortedProducts()).map((item) => {
              if (!isMobile && toolbarActive === 1) {
                return (
                  <Link to={`/product/${item.slug}`} key={item.id}>
                    <ProductCell
                      image={item.images[0]}
                      name={item.name}
                      price={item.price}
                      salePrice={item.salePrice}
                      description={item.shortDescription}
                      rate={item.rating}
                      onClickAddToCart={() => handleOnClickAddToCart(item)}
                    />
                  </Link>
                );
              }

              return (
                <Link to={`/product/${item.slug}`} key={item.id}>
                  <ProductCard
                    columns={toolbarActive}
                    image={item.images[0]}
                    name={item.name}
                    price={item.price}
                    salePrice={item.salePrice}
                    rate={item.rating}
                    onClickAddToCart={() => handleOnClickAddToCart(item)}
                  />
                </Link>
              );
            })}
          </Box>
        )}
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          p={{
            xs: '16px 0',
            sm: '24px 0',
            md: '32px 0',
          }}
        >
          <Pagination
            activePage={activePage}
            setActivePage={setActivePage}
            totalPages={Math.ceil(data.length / Setting.LIMIT_PRODUCT)}
            roundness="circle"
            color="success"
            nextPrevButton
            lastFirstButton
          />
        </Box>
      </Box>
    </Box>
  );
}
