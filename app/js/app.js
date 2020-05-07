import { MDCSelect } from '@material/select';
import { MDCList } from '@material/list';
import { MDCDrawer } from '@material/drawer';
import { MDCMenu } from '@material/menu';
import { MDCRipple } from '@material/ripple';

const buttonsRipple = document.querySelectorAll('.mdc-button');

for (const item of buttonsRipple) {
    const buttonRipple = new MDCRipple(item);
}

const fabRipples = document.querySelectorAll('.mdc-fab');

for (const item of fabRipples) {
    const fabRipple = new MDCRipple(item);
}

const selects = document.querySelectorAll('.mdc-select');

for (const item of selects) {
    const select = new MDCSelect(item);
}

// select.listen('MDCSelect:change', () => {
//     alert(`Selected option at index ${select.selectedIndex} with value "${select.value}"`);
// });

const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;

// const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
// const menu = new MDCMenu(document.querySelector('.mdc-menu'));
// menu.open = true;
