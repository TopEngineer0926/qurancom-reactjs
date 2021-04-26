import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "./LangDropdown.css";
import { LangContext,CheckedContext } from "./Store";
import {langToTrans} from './maps/languageToTranslatorMap';

const Style = {
  textDecoration: "none",
  fontSize: "14px",
  color: "#747474"
};

function Drop() {
  const [lang, setLang] = useContext(LangContext);
  const [check,setCheck] = useContext(CheckedContext);

  return (
    <UncontrolledDropdown>
      <DropdownToggle nav caret style={Style}>
        <FormattedMessage id="Langs" />
      </DropdownToggle>

      <DropdownMenu right>
        <DropdownItem
          className={
            lang
              ? lang === "de"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("de");
            setCheck({[langToTrans.de]:true});
          }}
        >
          Deutsch
        </DropdownItem>


        <DropdownItem
          className={
            lang
              ? lang === "tr"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("tr");
            setCheck({[langToTrans.tr]:true});
          }}
        >
          Türkçe
        </DropdownItem>


        <DropdownItem
          className={
            lang
              ? lang === "ar"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("ar");
            setCheck({[langToTrans.ar]:true});
          }}
        >
          عربى
        </DropdownItem>



        <DropdownItem
          className={
            lang
              ? lang === "en"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("en");
            setCheck({[langToTrans.en]:true});
          }}
        >
          English
        </DropdownItem>

        <DropdownItem
          className={
            lang
              ? lang === "bs"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("bs");
            setCheck({[langToTrans.bs]:true});
          }}
        >
          Bosanski
        </DropdownItem>

        <DropdownItem
          className={
            lang
              ? lang === "sq"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("sq");
            setCheck({[langToTrans.sq]:true});
          }}
        >
          Gjuhë Shqipe
        </DropdownItem>

        <DropdownItem
          className={
            lang
              ? lang === "ur"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("ur");
            setCheck({[langToTrans.ur]:true});
          }}
        >
          اردو{" "}
        </DropdownItem>


        <DropdownItem
          className={
            lang
              ? lang === "fa"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("fa");
            setCheck({[langToTrans.fa]:true});
          }}
        >
          فارسی{" "}
        </DropdownItem>


        <DropdownItem
         className={
          lang
            ? lang === "ru"
              ? "stripe Selected"
              : "stripe"
            : "stripe ...."
        }
          onClick={() => {
            setLang("ru");
            setCheck({[langToTrans.ru]:true});
          }}
        >
          Русский
        </DropdownItem>

        <DropdownItem
          className={
            lang
              ? lang === "bg"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("bg");
            setCheck({[langToTrans.bg]:true});
          }}
        >
          български
        </DropdownItem>

        <DropdownItem
          className={
            lang
              ? lang === "fr"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("fr");
            setCheck({[langToTrans.fr]:true});
          }}
        >
          Français
        </DropdownItem>



        <DropdownItem
         className={
          lang
            ? lang === "nl"
              ? "stripe Selected"
              : "stripe"
            : "stripe ...."
        }
          onClick={() => {
            setLang("nl");
            setCheck({[langToTrans.nl]:true});
          }}
        >
          Nederlands
        </DropdownItem>


        <DropdownItem
          className={
            lang
              ? lang === "it"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("it");
            setCheck({[langToTrans.it]:true});
          }}
        >
          Italiano
        </DropdownItem>

        <DropdownItem
          className={
            lang
              ? lang === "es"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("es");
            setCheck({[langToTrans.es]:true});
          }}
        >
          Español
        </DropdownItem>

        <DropdownItem
          className={
            lang
              ? lang === "pt"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("pt");
            setCheck({[langToTrans.pt]:true});
          }}
        >
          Português
        </DropdownItem>

        <DropdownItem
          className={
            lang
              ? lang === "da"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("da");
            setCheck({[langToTrans.da]:true});
          }}
        >
          Dansk
        </DropdownItem>


        <DropdownItem
          className={
            lang
              ? lang === "sv"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("sv");
            setCheck({[langToTrans.sv]:true});
          }}
        >
          Svenska
        </DropdownItem>

        <DropdownItem
         className={
          lang
            ? lang === "no"
              ? "stripe Selected"
              : "stripe"
            : "stripe ...."
        }
          onClick={() => {
            setLang("no");
            setCheck({[langToTrans.no]:true});
          }}
        >
          Norsk
        </DropdownItem>

    <DropdownItem
         className={
          lang
            ? lang === "fi"
              ? "stripe Selected"
              : "stripe"
            : "stripe ...."
        }
          onClick={() => {
            setLang("fi");
            setCheck({[langToTrans.fi]:true});
          }}
        >
          Suomi
        </DropdownItem>

        <DropdownItem
          className={
            lang
              ? lang === "id"
                ? "stripe Selected"
                : "stripe"
              : "stripe ...."
          }
          onClick={() => {
            setLang("id");
            setCheck({[langToTrans.id]:true});
          }}
        >
          Bahasa Indonesia
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}
export default Drop;
