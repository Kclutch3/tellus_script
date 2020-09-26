  L.TlsLayer2 = L.TileLayer.extend({
        statics: {
            type: {
                alosndviscript: {
					url: 'https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_kuni_data/{z}/{x}/{y}.png',
                    ext: 'png',
                    min: 0,
                    max: 15,
                    discription: 'Hazard Map(Flood)',
                    attribution: '&copy;国土地理院',
                    displayType: 'BASE', 
                    errtile: 'noimage.png'                },
            }
  		},
        discription: null,
        displayType : null,
        preset: null,        
        initialize: function (key) {
            key = "alosndviscript";
            var type = L.TlsLayer2.type[key];
            if (!type)
            {
                return;
            }
            this.url = type.url;
            this.discription = type.discription;
            this.displayType = type.displayType;
            this.min = type.min;
            this.max = type.max;
            this.opacity = 1.0;
            noimgFile = "noimageWhite.png";
            var options = L.setOptions(this, {
                attribution: type.attribution,
                minZoom: 0,
                maxZoom: 18,
                maxNativeZoom: type.max,
                opacity: this.opacity,
                errorTileUrl: noimgFile
            });
            L.TileLayer.prototype.initialize.call(this, this.url, options);
            var headers = [{ header: 'Authorization', value: '' + '' },
                           { header: 'content-type', value: 'text/plain'},];
            this.headers = headers;
        },
        createTile: function(coords, done) {
            var url = this.getTileUrl(coords);
            var img = document.createElement('img');
            TileToken = retToken();
            var headers = [
                { header: 'Authorization', value: 'Bearer ' + TileToken },
                          { header: 'content-type', value: 'text/plain'},];
            this.headers = headers;
                callAjax(
                  url,
                  this.mapkey,
                  this._mapToAdd._container.id,
                  response = function(response, mapkey, targetMap) {
                    if ((response === void 0) ||
                        (response === null)) {
                    }else{
                      img.src = URL.createObjectURL(response);
                      done(null, img);
                    }
                  },
                  this.headers
                );
            return img;
        }
    }); //end extend
L.FLOOD = function(opts) {
    return new L.TlsLayer2(opts);
};
map.addLayer(L.FLOOD());
