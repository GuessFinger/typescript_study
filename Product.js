import axios from 'axios';
import to from 'await-to-js';

/**
 * @description 主要调用的方式 返回的都是Promise对象
 * changeProductOptions
 * queryProduct
 */
class Product {
    _productDescription = [[], [], [], []];
    _selectionOptions = new Array(4);
    _queryProductParams = {categoryId: "2011-01", pbiId: ''};
    _defaultProductProperty = ['product', 'productLine', 'productFamily'];
    _queryVersionParams = {
        product: '',
        productLine: '',
        productFamily: ''
    }
    _urlParams = ['/mx/product/product', '/mx/product/productLine', '/mx/product/productFamily'];

    constructor() {
    }

    get productDescription() {
        return this._productDescription;
    }

    set productDescription(value) {
        this._productDescription = value;
    }

    get selectionOptions() {
        return this._selectionOptions;
    }

    set selectionOptions(value) {
        this._selectionOptions = value;
    }

    get queryProductParams() {
        return this._queryProductParams;
    }

    set queryProductParams(value) {
        this._queryProductParams = value;
    }

    get queryVersionParams() {
        return this._queryVersionParams;
    }

    set queryVersionParams(value) {
        this._queryVersionParams = value;
    }

    get urlParams() {
        return this._urlParams;
    }

    set urlParams(value) {
        this._urlParams = value;
    }

    queryProductMessage(index, params) {
        return axios.get(this._urlParams[index], params);
    }

    queryProductVersion(params) {
        return axios.get('/mx/version', params);
    }

    composeOptionsAndSelected(data, index) {
        this._productDescription[index] = data;
        this._selectionOptions[index] = data[0].pbiId;
    }

    composeQueryVersionParams(selectedObject, index) {
        this._queryVersionParams[this._defaultProductProperty[index]] = selectedObject.pbiId;
    }

    composeQueryParams(selectedObject, index) {
        return Object.assign({}, this._queryProductParams, {pbiId: selectedObject.pbiId});
    }

    computedStartIndex(indexOrProductProperty) {
        let startIndex = -1;
        if (typeof indexOrProductProperty === 'number') {
            startIndex = indexOrProductProperty;
            if (![0, 1, 2, 3].includes(startIndex)) {
                throw new Error('索引数只能是小于4大于0的整数');
            }
        }
        if (typeof indexOrProductProperty === 'string') {
            startIndex = this._defaultProductProperty.indexOf(indexOrProductProperty);
            if (startIndex < 0) {
                throw new Error('请输入 product/productLine/productFamily/version参数');
            }
        }
        return startIndex + 1;
    }

    clearOptionsAndSelectedOption(startIndex) {
        for (let i = startIndex; i < 4; i++) {
            this._productDescription[i] = [];
            this._selectionOptions[i] = '';
        }
    }

    /**
     * @param indexOrProductProperty  改变的索引 或者改变哪一个属性
     * @param pbiId  请求查询参数
     * @returns {Promise<unknown>}  返回所有的列表 以及 默认勾选的值
     */
    changeProductOptions(indexOrProductProperty, pbiId) {
        const startIndex = this.computedStartIndex(indexOrProductProperty);
        this.clearOptionsAndSelectedOption(startIndex);
        return this.queryProduct(indexOrProductProperty, {pbiId});
    }

    /**
     * @param startIndex
     * @param param
     * @returns {Promise<unknown>}  返回所有的列表 以及 默认的选项值
     */
    async queryProduct(startIndex, param) {
        let params = Object.assign({}, this._queryProductParams, param);

        for (let i = startIndex; i < 4; i++) {
            console.log('params', params);
            const [err, res] = i != 3 ?
                await to(this.queryProductMessage(i, params))
                : await to(this.queryProductVersion(params));

            if (err || res.data.code !== 200 || res.data.list.length === 0) break;
            this.composeOptionsAndSelected(res.data.list, i);
            const selectedObject = res.data.list[0];
            this.composeQueryVersionParams(selectedObject, i);
            params = this.composeQueryParams(selectedObject, i);
        }

        return new Promise(resolve => {
            const resultObject = {
                productList: [...this._productDescription],
                selectedList: [...this._selectionOptions]
            }
            resolve(resultObject);
        })
    }
}

export {Product};
