(function() {
    var projection = ol.proj.get('EPSG:4326');
    var projectionExtent = projection.getExtent();
    var size = ol.extent.getWidth(projectionExtent) / 256;
    var resolutions = [];
    var matrixIds = [];
    for (var z = 2; z < 19; ++z) {
        resolutions[z] = size / Math.pow(2, z);
        matrixIds[z] = z;
    }
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Group({
                'title': 'Base maps',
                layers: [
                    
                    new ol.layer.Group({
                        title: 'Water color with labels',
                        type: 'base',
                        combine: true,
                        visible: false,
                        //zIndex: 3000,
                        layers: [
                            new ol.layer.Tile({
                                source: new ol.source.Stamen({
                                    layer: 'watercolor'
                                })
                            }),
                            new ol.layer.Tile({
                                source: new ol.source.Stamen({
                                    layer: 'terrain-labels'
                                })
                            })
                        ]
                    }),
                    
                    new ol.layer.Tile({
                        title: 'Water color',
                        type: 'base',
                        visible: false,
                        //zIndex: 2000,
                        source: new ol.source.Stamen({
                            layer: 'watercolor'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'OSM',
                        type: 'base',
                        visible: true,
                        source: new ol.source.OSM()
                    }),
                    new ol.layer.Tile({
                        title: '山东矢量地图',
                        type: 'base',
                        visible: true,
                        source: new ol.source.WMTS({
                            name: "山东矢量图",
                            url: "http://www.sdmap.gov.cn/tileservice/SDPubMap",
                            style: 'default',
                            format: 'image/png',
                            matrixSet: "CGCS2000",
                            layer: "sdvec",
                            tileGrid: new ol.tilegrid.WMTS({
                                origin: ol.extent.getTopLeft(projectionExtent),
                                resolutions: resolutions,
                                matrixIds: matrixIds 
                            })
                        })
                    }),
                    new ol.layer.Tile({
                        title: '山东影像地图',
                        type: 'base',
                        visible: true,
                        source: new ol.source.WMTS({
                            url: "http://www.sdmap.gov.cn/tileservice/SDRasterPubMap",
                            style: 'default',
                            matrixSet: "CGCS2000",
                            layer: 'sdimg',
                            tileGrid: new ol.tilegrid.WMTS({
                                origin: ol.extent.getTopLeft(projectionExtent),
                                resolutions: resolutions,
                                matrixIds: matrixIds
                            })
                        })
                    })
                ]
            }),
            new ol.layer.Group({
                title: 'Overlays',
                layers: [
                    new ol.layer.Image({
                        title: 'Countries',
                        source: new ol.source.ImageArcGISRest({
                            ratio: 1,
                            params: {'LAYERS': 'show:0'},
                            url: "https://ons-inspire.esriuk.com/arcgis/rest/services/Administrative_Boundaries/Countries_December_2016_Boundaries/MapServer"
                        })
                    }),
                    new ol.layer.Tile({
                        title: '山东行政区划图',
                        source: new ol.source.TileWMS({
                            url: "http://124.128.48.217:6080/arcgis/services/sdxzj/MapServer/WMSServer",
                            params: {'LAYERS':[1],'TILED':true}
                        })
                    })
                ]
            })
        ],
        view: new ol.View({
            //center: ol.proj.transform([-0.92, 52.96], 'EPSG:4326', 'EPSG:3857'),
            projection: ol.proj.get('EPSG:4326'),
            center: [118.6691236495, 37.4337136745],
            zoom: 12
        })
    });

    var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Légende' // Optional label for button
    });
    map.addControl(layerSwitcher);

})();
