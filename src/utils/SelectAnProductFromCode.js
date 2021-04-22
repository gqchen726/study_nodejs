import axios from "axios";
import {urlsUtil} from "../public/ApiUrls/UrlsUtil";

export const selectOneProduct = productCode => axios.get(`${urlsUtil.product.searchFromCode}?id=${productCode}`);