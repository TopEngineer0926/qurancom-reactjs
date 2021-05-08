import React, {useContext, useEffect, useState, useRef} from "react";
import MainBody from "./MainSearchBar";
import Surahss from "./HomeSurahs";
import Footer from "./Footer";
import Header from "./HomeHeader";
import { Helmet } from 'react-helmet';
import { SurahContext, URLContext, DropDownChapterContext, LangContext } from "./Store";
function Homepage() {
  const [ChapData, setHome] = useContext(DropDownChapterContext);
  const [lang, setLang] = useContext(LangContext);

  const [Verses, setVerses] = useState();
  const [info, setInfo] = useState();
  const [SurahNo,] = useContext(SurahContext);
  // const [isLoading, setLoading]=useContext(LoadingContext);
  const [URL, setUrl] = useContext(URLContext);
  const prevSurah = usePrevious(SurahNo);


  useEffect(() => {

    const fetchChapters = async () => {
      fetch(`${URL}chapters?language=${lang}`)
        .then(res => res.json())
        .then(data => setHome(data.chapters));
    }

    const fetchData = async () => {

      fetch(`${URL}chapters/${SurahNo}/verses?language=${lang}`)
        .then(res => res.json())
        .then(dat => setVerses(dat.verses));
      fetch(`${URL}chapters/${SurahNo}/info`)
        .then(res => res.json())
        .then(dat => { setInfo(dat.chapter_info); });

    }
    fetchData();
    fetchChapters();
  }, [SurahNo, lang]);


  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  return (
    <>
      <Helmet>
        <title> Islam Check | Home</title>
      </Helmet>
      <Header ChapData={ChapData} />
      <MainBody />
      {/* <Surahss /> */}
      <Footer />
    </>
  );
}

export default Homepage;
