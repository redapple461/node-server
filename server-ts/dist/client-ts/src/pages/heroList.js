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
const react_router_dom_1 = require("react-router-dom");
require("./css/heroList.css");
const react_redux_1 = require("react-redux");
const actions = __importStar(require("../actions/"));
const button_1 = require("../components/button");
const radio_1 = require("../components/radio");
const hList_1 = require("../components/hList");
const emptyHeroes_1 = require("../components/emptyHeroes");
const httpHook_1 = require("../http/httpHook");
const HeroList = (props) => {
    const heroes = react_redux_1.useSelector((state) => state.heroes);
    const universe = react_redux_1.useSelector((state) => state.searchUniverse);
    const isUnLoad = react_redux_1.useSelector((state) => state.noHeroes);
    const heroToAdd = react_redux_1.useSelector((state) => state.addHero);
    const isLoad = react_redux_1.useSelector((state) => state.isLoad);
    const dispatch = react_redux_1.useDispatch();
    let timeout = null;
    function fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield httpHook_1.getHeroes().then(res => {
                    res.sort((a, b) => a.id - b.id);
                    dispatch(actions.getData(res));
                });
            }
            catch (e) {
                // tslint:disable-next-line: no-console
                console.log(e);
            }
        });
    }
    react_1.useEffect(() => {
        if (isLoad) {
            dispatch(actions.clearDetailHero());
        }
        if (isUnLoad) {
            fetchData();
            dispatch(actions.loadComplete());
        }
    });
    const heroList = heroes.length ? react_1.default.createElement(hList_1.HeroesList, { heroes: heroes, universe: universe, dispatch: dispatch }) : react_1.default.createElement(emptyHeroes_1.EmptyHeroes, null);
    const add = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            httpHook_1.addHero(heroToAdd).then(res => {
                document.getElementById('add_btn').disabled = true;
                dispatch(actions.addHero(res));
                dispatch(actions.clearAddHero());
                clearAddForm();
            });
            // window.M.toast({html: "Hero "+heroToAdd.name+" was added"})
        }
        catch (e) {
            // window.M.toast(e);
        }
    });
    const clearAddForm = () => {
        setTimeout(() => {
            document.getElementById('rMarvel').checked = false;
            document.getElementById('rDC').checked = false;
            document.getElementById('power_hit').checked = false;
            document.getElementById('heal').checked = false;
            document.getElementById('add_btn').disabled = false;
            document.getElementById('add_input').value = '';
        }, 300);
    };
    function onCheck(e) {
        if (e.currentTarget.checked) {
            dispatch(actions.addSkill(e.currentTarget.value));
        }
        else {
            dispatch(actions.removeSkill(e.currentTarget.value));
        }
    }
    const inputEventHadler = (e) => {
        e.persist();
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            dispatch(actions.updateAddHeroName(e.target.value));
        }, 300);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("h1", null, " Heroes List"),
        react_1.default.createElement(react_router_dom_1.Link, { to: '/main' },
            " ",
            react_1.default.createElement(button_1.Button, { className: 'waves-effect waves-light btn', text: 'Dashboard' })),
        heroList,
        react_1.default.createElement("div", null,
            "Add new hero",
            react_1.default.createElement("input", { id: 'add_input', type: 'text', onChange: (e) => inputEventHadler(e) }),
            react_1.default.createElement(button_1.Button, { id: 'add_btn', className: 'waves-effect waves-light btn', onClick: add, text: 'Add hero' }),
            react_1.default.createElement("div", null,
                react_1.default.createElement("strong", null, " Choose universe: "),
                react_1.default.createElement(radio_1.RadioButton, { id: 'rMarvel', name: 'group1', className: 'with-gap', value: 'Marvel', text: 'Marvel', dispatch: () => dispatch(actions.updateAddHeroUniverse('Marvel')) }),
                react_1.default.createElement(radio_1.RadioButton, { id: 'rDC', name: 'group1', className: 'with-gap', value: 'DC', text: 'DC', dispatch: () => dispatch(actions.updateAddHeroUniverse('DC')) })),
            react_1.default.createElement("div", null,
                react_1.default.createElement("strong", null, " Choose skills: "),
                react_1.default.createElement(radio_1.RadioButton, { id: 'power_hit', type: 'checkbox', className: 'with-gap', value: 'Power Hit', text: 'Power Hit', dispatch: onCheck }),
                react_1.default.createElement(radio_1.RadioButton, { id: 'heal', type: 'checkbox', className: 'with-gap', value: 'Heal', text: 'Heal', dispatch: onCheck }))),
        react_1.default.createElement(button_1.Button, { text: 'Go back', className: 'waves-effect waves-light btn', onClick: () => props.history.goBack() })));
};
exports.default = HeroList;
//# sourceMappingURL=heroList.js.map