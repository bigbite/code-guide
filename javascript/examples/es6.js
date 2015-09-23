'use strict';

import mapStyles from '../config/mapoptions';

let maps = {
  /**
   * the map instance
   *
   * @type {null|Object}
   */
  map: null,

  /**
   * array of locations from global scope
   *
   * @type {Array}
   */
  locations: globals.locations,

  cache: {
    locations: {}
  },

  /**
   * google maps geocoder api
   *
   * @type {Object}
   */
  geocoder: {},

  /**
   * default options
   *
   * @type {Object}
   */
  defaults: {
    offset: [0, -120]
  },

  /**
   * map marker image
   *
   * @type {Object}
   */
  image: {},

  /**
   * map appearance settings
   *
   * @type {Object}
   */
  options: {
    zoom:   13,
    styles: mapStyles,
    disableDefaultUI: true,
    backgroundColor:  '#2d2e30',
    center: {
      // default to middlesbrough
      lat: 54.5796906,
      lng: -1.2357411
    }
  },

  /**
   * get the lat/lng of an address by calling
   * the google maps geocoder api
   *
   * @param {Integer}   index     the location array index
   * @param {String}    location  the address
   * @param {Function}  callback  fn to execute upon response
   */
  getPos(index, location, callback) {
    this.geocoder.geocode({
      address: location
    }, callback.bind(this, index));
  },

  /**
   * add a marker to the current map
   *
   * @param {Integer}  index     location array index
   * @param {Object}   location  the api response
   */
  setMarker(index, location) {
    if (!location[0]) {
      return false;
    }

    let coords = location[0].geometry.location;
    let name   = this.locations[index].town.toLowerCase();

    this.cache.locations[name] = coords;

    return new google.maps.Marker({
      raiseOnDrag: false,
      position:    coords,
      icon:  this.image,
      title: this.locations[index].title,
      map:   this.map
    });
  },

  /**
   * set a map marker for each location
   */
  addMarkers() {
    _.forOwn(this.locations, (val, key) => {
      this.getPos(key, val.postcode, this.setMarker);
    });
  },

  /**
   * set the map position
   *
   * @param {LatLng Object}  pos  google maps latlng object
   */
  setPos(pos) {
    if (pos) {
      this.map.setCenter(pos);
    }

    this.map.panBy(...this.defaults.offset);
  },

  /**
   * create the map and run post-setup config
   */
  runSetup() {
    this.setPos();
    this.addMarkers();
  },

  /**
   * trigger setup if map exists
   *
   * @param  {DOMElem}  mapElem  the map selector
   * @param  {Object}   opts     instantiation options
   */
  init(mapElem, opts = {}) {
    if (!mapElem || !window.google) {
      return;
    }

    this.options  = _.merge(this.options, opts);
    this.map      = new google.maps.Map(mapElem, this.options);
    this.geocoder = new google.maps.Geocoder();
    this.image    = new google.maps.MarkerImage(
      globals.mapMarker, // image
      null, // size
      null, // origin
      null, // anchor
      new google.maps.Size(22, 35.5)
    );

    google.maps.event.addListener(this.map, 'idle', () => {
      postal.publish({
        channel: 'locations',
        topic:   'mapidle',
        data:    this.cache
      });
    });

    this.runSetup();
  }
};

export default maps;
