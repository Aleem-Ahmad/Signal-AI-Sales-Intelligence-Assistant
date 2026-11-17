function ControlKit() {
  this.addPanel = function() { return this; };
  this.addGroup = function() { return this; };
  this.addSubGroup = function() { return this; };
  this.addNumberInput = function() { return this; };
  this.addStringOutput = function() { return this; };
  this.addSelect = function() { return this; };
  this.addSlider = function() { return this; };
  this.addCheckbox = function() { return this; };
  this.addButton = function() { return this; };
  this.addColor = function() { return this; };
}

ControlKit.prototype = {
  addPanel: function() { return this; },
  addGroup: function() { return this; },
  addSubGroup: function() { return this; },
  addNumberInput: function() { return this; },
  addStringOutput: function() { return this; },
  addSelect: function() { return this; },
  addSlider: function() { return this; },
  addCheckbox: function() { return this; },
  addButton: function() { return this; },
  addColor: function() { return this; },
};

export default ControlKit;

