/* Baggage Band
 * v0.0.1
 *
 * Baggage Band is a light weight carousel
 */

BaggageBand = function(selector, options) {
  // Allows BaggageBand to be called with or without new
  if(this instanceof BaggageBand) {
    this.init(selector, options);
  } else {
    new BaggageBand(selector, options);
  }
};

jQuery.fn.baggageband = function( options ) {
  return new BaggageBand(this.selector, options);
};

BaggageBand.options = {
  container : '#bb-container',
  content   : '#bb-content',
  prev      : '#bb-previous',
  next      : '#bb-next',
  current   : 1, // if you want to change the starting position
  html      : '<div></div>'
};


BaggageBand.prototype.init = function(selector, options) {
  // init('.baggageband', {...})
  // if(selector !== undefined) {  }
  // init({...})
  // if(typeof selector === 'object' && options === undefined) { options = selector; selector = undefined; }

  this.options  = jQuery.extend({}, BaggageBand.options, options);
  this.container = selector || this.options.container;
  this.next = this.options.next;
  this.prev = this.options.prev;
  this.current = this.options.current;
  this.panels = jQuery(this.options.content).children(); // This can be done better.
  this.items = this.panels.length;

  console.log(this.panels, this.items);
  this._setup();
};

BaggageBand.prototype._setup = function() {
  // var next = jQuery.proxy(, this);
  // Add HTML to DOM
  // jQuery(this.container).append(BaggageBand.options.html);
  var that = this;
  // console.log(jQuery(this.next));
  jQuery(this.next).on('click', function() { that._paginate('next', that) } );
  jQuery(this.prev).on('click', function() { that._paginate('prev', that) } );

  jQuery(document).trigger('baggageband.initialized');
};

BaggageBand.prototype._paginate = function(thing, that) {
  switch (thing) {
    case 'next':
      // check and make sure we aren't at
      // the end go to start if we are
      if (that.current === that.items){
        that.current = 1;
      } else {
        that.current++;
      }
      jQuery(document).trigger('baggageband.next');
      break;
    case 'prev':
      // check and make sure we aren't at
      // the start go to end if we are
      if (that.current === 1){
        that.current = that.items;
      } else {
        that.current--;
      }
      jQuery(document).trigger('baggageband.prev');
      break;
    default:
      // if we don't pass in prev or next pass in a number.
      that.current = thing;
      console.log(thing);
      break;
  }
  // now we know where to go, trigger event and show panel
  //

  console.log(that.current);

  jQuery(document).trigger('baggageband.paginated');
};
// BaggageBand.prototype._loadContent = function(href) {
  // var imageTypesRegexp = new RegExp('\\.(' + this.options.imageExts.join('|') + ')', 'i'),
      // urlRegex         = new RegExp('^[^ ]*$');

  // // Render a div
  // if( href.match(/#/) ) {
    // this._loadFragment(href);

  // // Render an image
  // } else if( href.match(imageTypesRegexp) ) {
    // this._loadImage(href);

  // // Render ajax content
  // } else if( href.match(urlRegex) ) {
    // this._loadAjax(href);

  // // Render text content
  // } else {
    // this._setContent(href);
  // }

// };

// BaggageBand.prototype._loadFragment = function(fragment) {
  // var id = fragment.substring(fragment.indexOf('#'));
  // this._setContent(jQuery(id).html());
// };

// BaggageBand.prototype._loadImage = function(url) {
  // this._setContent('<img src="' + url + '" />');
// };

// BaggageBand.prototype._loadAjax = function(url) {
  // var that = this;

  // jQuery.ajax(url, {
    // dataType: 'html',
    // success: function(data) {
      // that._setContent(data);
    // }
  // });
// };

// BaggageBand.prototype._setContent = function(html) {
  // jQuery(this._contentSelector()).html(html);
  // jQuery(document).trigger('baggageband.loaded');
// };

// BaggageBand.prototype._overlaySelector = function() {
  // return this.options.baggagebandSelector + ' ' + this.options.overlaySelector;
// };

// BaggageBand.prototype._contentSelector = function() {
  // return this.options.baggagebandSelector + ' ' + this.options.contentSelector;
// };

// BaggageBand.prototype._closeSelector = function() {
  // return this.options.baggagebandSelector + ' ' + this.options.closeSelector;
// };
