import React, { useState } from "react"

export const InfoContext = React.createContext();
export const ReadingContext = React.createContext();
export const LangContext = React.createContext();
export const URLContext = React.createContext();
export const ChapterContext = React.createContext();
export const DropDownChapterContext = React.createContext();

export const SurahContext = React.createContext();
export const TranslitContext = React.createContext();
export const CurrentPageContext = React.createContext();
export const LastPageContext = React.createContext();
export const endFlagContext = React.createContext();

//For Verse Dropdown
export const ChosenVerseFlagContext = React.createContext();
export const ChosenVerseAndPageContext = React.createContext();
export const OffsetContext = React.createContext();

export const LoadingContext = React.createContext();


export const CheckedContext = React.createContext();
export const isCheckedFlag = React.createContext();

export const QueryContext = React.createContext();

export const ReciterContext = React.createContext();
//QueryFLAG cONTEXT
export const SearchFlagContext = React.createContext();
//ShowBism
export const BismillahContext = React.createContext();


export const ArbicFontSizeContext = React.createContext();

export const ScrollToContext = React.createContext();

export const VERSESCONTEXT = React.createContext();

export const DayContext = React.createContext();

export const TopContext = React.createContext();
export const TranslationsLoaderContext = React.createContext();
export const DisabledContext = React.createContext();
export const ResultPageContext = React.createContext();

export const ReciterLoadingContext = React.createContext();
export const NoResultsContext = React.createContext();
export const TransFontChangeContext = React.createContext();

const Store = ({ children }) => {


    // const [URL, setURL] = useState("http://18.189.100.203:8080/quran-app-services/api/");
    const [URL, setURL] = useState("https://services.islamcheck.com/api/");
    //  const [AfterHash,setHash]=useState(window.location.href.substring(window.location.href.indexOf("/#/") + 3, window.location.href.length))
    const [lang, setlang] = useState("de");
    const [ShowInfo, setShow] = useState(false);
    const [ShowReading, setReading] = useState(false);
    const [ArbicFontSize, setArbicFontSize] = useState(56);
    const [NoResults, setNoResults] = useState(false)
    const [TransFontSize, setTransFontSize] = useState(16);
    const [Chapters, setChapters] = useState({})
    const [DropDownChapters, setDropDownChapters] = useState(null)

    //  var AfterHash=window.location.href.substring(window.location.href.indexOf("/#/") + 3, window.location.href.length);
    const [Reciters, setRecits] = useState(1);
    const [SurahNo, setSurahNo] = useState(0);

    const [CurrentpageNo, setPage] = useState(1);
    const [LastpageNo, setLast] = useState(1);

    const [endFlag, setFlag] = useState(true);
    //Transliteration Flag
    const [Trans, setTrans] = useState(false);
    //Verse Dropdown....
    const [isChosen, setChosen] = useState(false);
    const [ChosenVerseAndPage, setPageandOffset] = useState({
        Chosenpage: 0,
        offset: 0
    });
    const [off, setoff] = useState("0");

    const [Loading, setLoading] = useState(true);
    const [check, setCheck] = useState({ 20: true });

    const [Query, setQuery] = useState("");
    const [Flag, setSearchFlag] = useState(false)
    //Bismillah Show flag
    const [Bism, setBism] = useState(true)

    const [isScroll, setScroll] = useState(0);

    const [Verses, setVerses] = useState("");

    const [Top, setTop] = useState();
    const [MiniLoader, setMini] = useState(false);
    const [Disabled, setDisabled] = useState();
    const [ResultPage, setResultPage] = useState(1);

    const [ReciterLoading, setReciterLoading] = useState(false);

    React.useEffect(() => {
        const ReadFlag = sessionStorage.getItem('ReadFlag');
        const InfoFlag = sessionStorage.getItem('InfoFlag');
        const Lango = localStorage.getItem('lang');
        const Reciter = sessionStorage.getItem('Reciter');
        const TranslatorsChecked = sessionStorage.getItem('Translators');
        const Surah = sessionStorage.getItem('Surah');
        const QueryLocal = sessionStorage.getItem('Query');
        const ResPage = sessionStorage.getItem('ResultPage');
        const ArbicFont = sessionStorage.getItem('ArbiFont', JSON.stringify(ArbicFontSize))
        const TransFonti = sessionStorage.getItem('TransFont', JSON.stringify(TransFontSize))


        if (ReadFlag) {
            setReading(JSON.parse(ReadFlag))

        }
        if (InfoFlag) {
            setShow(JSON.parse(InfoFlag))


        }
        if (Lango) {
            setlang(JSON.parse(Lango))

        }
        if (TranslatorsChecked) {
            setCheck(JSON.parse(TranslatorsChecked))
        }


        if (Reciter) {
            setRecits(JSON.parse(Reciter))

        }
        // if (Surah) {
        //     setSurahNo(JSON.parse(Surah))
        // }
        if (QueryLocal) {
            setQuery(JSON.parse(QueryLocal))

        }
        if (ResPage) {
            setResultPage(JSON.parse(ResPage))
        }
        if (ArbicFont) {

            setArbicFontSize(ArbicFont)
        }
        if (TransFonti) {

            setTransFontSize(TransFonti)
        }
    }, [])


    React.useEffect(() => {
        sessionStorage.setItem('ReadFlag', JSON.stringify(ShowReading))
        sessionStorage.setItem('InfoFlag', JSON.stringify(ShowInfo))

        sessionStorage.setItem('Reciter', JSON.stringify(Reciters))
        sessionStorage.setItem('Translators', JSON.stringify(check))
        sessionStorage.setItem('Surah', JSON.stringify(SurahNo))
        localStorage.setItem('lang', JSON.stringify(lang))
        sessionStorage.setItem('Query', JSON.stringify(Query))

        sessionStorage.setItem('ResultPage', JSON.stringify(ResultPage))
        sessionStorage.setItem('ArbiFont', ArbicFontSize)
        sessionStorage.setItem('TransFont', TransFontSize)


    }, [ShowReading, lang, ShowInfo, Reciters, check, SurahNo, Query, ResultPage, TransFontSize, ArbicFontSize])


    return (
        <DropDownChapterContext.Provider value={[DropDownChapters, setDropDownChapters]}>
            <ChapterContext.Provider value={[Chapters, setChapters]}>
                <ReadingContext.Provider value={[ShowReading, setReading]}>
                    <InfoContext.Provider value={[ShowInfo, setShow]}>
                        <LangContext.Provider value={[lang, setlang]}>
                            <SurahContext.Provider value={[SurahNo, setSurahNo]}>
                                <TranslitContext.Provider value={[Trans, setTrans]}>
                                    <CurrentPageContext.Provider value={[CurrentpageNo, setPage]}>
                                        <LastPageContext.Provider value={[LastpageNo, setLast]}>
                                            <ChosenVerseFlagContext.Provider value={[isChosen, setChosen]}>
                                                <endFlagContext.Provider value={[endFlag, setFlag]}>
                                                    <ChosenVerseAndPageContext.Provider
                                                        value={[ChosenVerseAndPage, setPageandOffset]}>
                                                        <OffsetContext.Provider value={[off, setoff]}>
                                                            <LoadingContext.Provider value={[Loading, setLoading]}>
                                                                <CheckedContext.Provider value={[check, setCheck]}>
                                                                    <ReciterContext.Provider value={[Reciters, setRecits]}>
                                                                        <QueryContext.Provider value={[Query, setQuery]}>
                                                                            <SearchFlagContext.Provider
                                                                                value={[Flag, setSearchFlag]}>
                                                                                <BismillahContext.Provider
                                                                                    value={[Bism, setBism]}>

                                                                                    <ArbicFontSizeContext.Provider
                                                                                        value={[ArbicFontSize, setArbicFontSize]}>
                                                                                        <URLContext.Provider
                                                                                            value={[URL, setURL]}>

                                                                                            <ScrollToContext.Provider value={[isScroll, setScroll]}>
                                                                                                <VERSESCONTEXT.Provider value={[Verses, setVerses]}>
                                                                                                    <TopContext.Provider value={[Top, setTop]}>
                                                                                                        <TranslationsLoaderContext.Provider value={[MiniLoader, setMini]}>
                                                                                                            <DisabledContext.Provider value={[Disabled, setDisabled]}>

                                                                                                                <ReciterLoadingContext.Provider value={[ReciterLoading, setReciterLoading]}>
                                                                                                                    <ResultPageContext.Provider value={[ResultPage, setResultPage]}>
                                                                                                                        <NoResultsContext.Provider value={[NoResults, setNoResults]}>

                                                                                                                            <TransFontChangeContext.Provider value={[TransFontSize, setTransFontSize]}>
                                                                                                                                {children}
                                                                                                                            </TransFontChangeContext.Provider>
                                                                                                                        </NoResultsContext.Provider>
                                                                                                                    </ResultPageContext.Provider>
                                                                                                                </ReciterLoadingContext.Provider>
                                                                                                            </DisabledContext.Provider>
                                                                                                        </TranslationsLoaderContext.Provider>
                                                                                                    </TopContext.Provider>

                                                                                                </VERSESCONTEXT.Provider>
                                                                                            </ScrollToContext.Provider>
                                                                                        </URLContext.Provider>
                                                                                    </ArbicFontSizeContext.Provider>

                                                                                </BismillahContext.Provider>
                                                                            </SearchFlagContext.Provider>
                                                                        </QueryContext.Provider>
                                                                    </ReciterContext.Provider>
                                                                </CheckedContext.Provider>
                                                            </LoadingContext.Provider>
                                                        </OffsetContext.Provider>
                                                    </ChosenVerseAndPageContext.Provider>
                                                </endFlagContext.Provider>
                                            </ChosenVerseFlagContext.Provider>
                                        </LastPageContext.Provider>
                                    </CurrentPageContext.Provider>
                                </TranslitContext.Provider>
                            </SurahContext.Provider>
                        </LangContext.Provider>
                    </InfoContext.Provider>
                </ReadingContext.Provider>
            </ChapterContext.Provider>
        </DropDownChapterContext.Provider>
    )

};
export default Store
