"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./css/heroDetail.css");
const react_redux_1 = require("react-redux");
const actions = __importStar(require("../actions"));
const _404_1 = require("../components/404");
const detailPage_1 = require("../components/detailPage");
const radio_1 = require("../components/radio");
const button_1 = require("../components/button");
const httpHook_1 = require("../http/httpHook");
exports.HeroDetailPage = (props) => {
    const detailHero = react_redux_1.useSelector((state) => state.detailHero);
    const dispatch = react_redux_1.useDispatch();
    const isLoad = react_redux_1.useSelector((state) => state.isLoad);
    function fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield httpHook_1.getByName(props.match.params.name)
                    .then(res => dispatch(actions.initDetailHero(res)));
            }
            catch (e) {
                // tslint:disable-next-line: no-console
                console.log(e);
            }
        });
    }
    const goBack = () => {
        props.history.goBack();
    };
    react_1.useEffect(() => {
        if (isLoad === false) {
            fetchData();
            dispatch(actions.isLoad());
        }
    });
    if (!detailHero) {
        return (react_1.default.createElement(_404_1.NoPage, { name: props.match.params.name }));
    }
    //               onChange={(e) => dispatch(actions.updateUniverse(e.target.value))}
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(detailPage_1.Details, { name: detailHero.name, id: detailHero.id, universe: detailHero.universe, skills: detailHero.skills }),
        react_1.default.createElement("div", { className: 'form' },
            react_1.default.createElement("p", null, " Type new name of hero and choose his universe"),
            react_1.default.createElement("input", { type: 'text', placeholder: detailHero.name, onChange: (e) => { dispatch(actions.updateName(e.target.value)); } }),
            react_1.default.createElement("div", null,
                react_1.default.createElement(radio_1.RadioButton, { className: 'with-gap', value: 'Marvel', text: 'Marvel', checked: detailHero.universe === 'Marvel', dispatch: () => dispatch(actions.updateUniverse('Marvel')) }),
                react_1.default.createElement(radio_1.RadioButton, { className: 'with-gap', value: 'DC', text: 'DC', checked: detailHero.universe === 'DC', dispatch: () => dispatch(actions.updateUniverse('DC')) }))),
        react_1.default.createElement(button_1.Button, { className: 'waves-effect waves-light btn', type: 'button', onClick: () => { goBack(); }, text: 'Back' }),
        react_1.default.createElement(button_1.Button, { className: 'waves-effect waves-light btn', type: 'button', onClick: () => { dispatch(actions.updateHero()); }, text: 'Save' })));
};
//# sourceMappingURL=heroDetailPage.js.map