class Filter {
  constructor(popup) {
    this.popup = popup;
  }

  createFilterObj() {
    const filterPopup = Object.values(this.popup.getAllComponents());
    const filterObj = {};

    filterPopup.forEach((filter) => {
      const component = filter.component;

      if (component.nameTemplate !== "EPCSDirection") {
        const name = component.name;
        const value = component.getValue();
        filterObj[name] = value;
      }
    });

    return filterObj;
  }

  setFilterObject(filterObj) {
    this.popup.components.forEach((component) => {
      const value = filterObj[component.componentName];
      component.props.value = value;
    });
  }
}

export default Filter;