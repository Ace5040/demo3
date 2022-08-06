class JoystickController {
    constructor({ joystick, rightMenu, leftMenu }, Vue) {

        this.component = joystick;
        this.rightMenu = rightMenu;
        this.leftMenu = leftMenu;
        this.$Vue = Vue;

        if (this.rightMenu) {
            this.component.props.rightEvent = this.component.props.rightEvent
                || `${this.component.name}_clickRight`;
            Vue.$bus.$on(this.component.props.rightEvent, () => this.rightButtonPressed());
        }

        if (this.leftMenu) {
            this.component.props.leftEvent = this.component.props.leftEvent
                || `${this.component.name}_clickLeft`;
            Vue.$bus.$on(this.component.props.leftEvent, () => this.leftButtonPressed());
        }
    }

    rightButtonPressed() {
        this.rightMenu.toggleOpen(this.component.isRight);
    }

    leftButtonPressed() {
        this.leftMenu.toggleOpen(this.component.isLeft);
    }
}

export default JoystickController;
