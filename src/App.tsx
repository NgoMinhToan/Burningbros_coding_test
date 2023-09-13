import './App.css'
import { useEffect, useRef, useState } from 'react';
import { useDebounceFn } from 'ahooks'
import { useQueryDummyData } from './services/service';

function App() {
  const [searchValue, setSearchValue] = useState<string>('')
  const initParam: DUMMY_JSON.TSearchParam = {
    page: 1,
    limit: 20,
    q: searchValue
  }
  const { data, fetchNextPage, isFetching } = useQueryDummyData(initParam)
  const itemList = data?.pages.reduce((products: DUMMY_JSON.TProduct[], page: DUMMY_JSON.TItemListResponse) => {
    return [...page.products, ...products]
  }, [])
  
  
  
  const listItemRef = useRef<HTMLDivElement>(null);
  const [isScrollEnd, setIsScrollEnd] = useState<boolean>(false)

  useEffect(() => {
    if (listItemRef && listItemRef.current ) {
      const listItemHtmlElement = listItemRef.current
      const handleScroll = () => {
        const buttomOffsetBeforeEnd = 10
        const scrollToEnd = listItemHtmlElement.scrollHeight - listItemHtmlElement.offsetHeight - listItemHtmlElement.scrollTop -buttomOffsetBeforeEnd
        setIsScrollEnd(scrollToEnd < 0)
      }
      listItemHtmlElement.addEventListener('scroll', handleScroll);
      return () => listItemHtmlElement && listItemHtmlElement.removeEventListener('scroll', handleScroll);
    }
  }, [listItemRef]);  

  useEffect(() => {
    if (isScrollEnd){
      fetchNextPage()
    }
  }, [isScrollEnd])

  const { run: handleSearchChange } = useDebounceFn((event) => {
    const value = typeof event === 'string' ? event : event.target.value;
    setSearchValue(value)
  }, { wait: 1000 })

  return (
    <div className='app'>
      <input type="text" className="search-input" placeholder='Search ...' onChange={handleSearchChange} />
      
      <div className="item-list" ref={listItemRef}>
        {itemList && itemList.map((item: DUMMY_JSON.TProduct) => (
          <div key={`${item.id}-${item.title}`} className="item flex flex-col justify-center">
            <span className="product-title font-semibold">{item.title}</span>
            <span className="product-price text-red-400 font-semibold text-lg">{item.price} $</span>
          </div>
        ))}
        <div key='item-loading' className="item loading-img">
          {isFetching && (
            <div className="data-loading">
              Loading ...
            </div>
          )  }
        </div>
      </div>
      
      {!isFetching && (!itemList || itemList && itemList.length == 0 )&& (
        <div className="data-empty">
          Data is empty!
        </div>
      )}
      
    </ div>
  )
}

export default App
