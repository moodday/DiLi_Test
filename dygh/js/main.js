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
    var sdtdsourceWMTS = new ol.source.WMTS({
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
    });

    var sdRsterSourceWMTS = new ol.source.WMTS({
        name: "山东影像地图",
        url: "http://www.sdmap.gov.cn/tileservice/SDRasterPubMap",
        style: 'default',
        //format: 'image/png',
        matrixSet: "CGCS2000",
        layer: "sdimg",   //sdimg改为其他内容都可以正常显示影像，不知道为什么？
        tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds 
        })
    });

    var sdRSAnnoSourceWMTS = new ol.source.WMTS({
        name: "山东影像注记",
        url: "http://www.sdmap.gov.cn/tileservice/SDRasterPubMapDJ",
        style: 'default',
        //format: 'image/png',
        matrixSet: "CGCS2000",
        layer: "sdcia",   //sdimg改为其他内容都可以正常显示影像，不知道为什么？
        tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds 
        })
    });
    
    var sddyRSAnnoSourceWMTS = new ol.source.WMTS({
        name: "东营影像注记",
        url: "http://60.214.233.45/tileservice/DYRasterNoteMap",
        style: 'default',
        format: 'image/png',
        matrixSet: "CGCS2000",
        layer: "sdcia",   //sdimg改为其他内容都可以正常显示影像，不知道为什么？
        tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds 
        })
    });
    
    var sdtdsourceWMS = new ol.source.TileWMS({
        name: "山东行政区划图",
        url: "http://124.128.48.217:6080/arcgis/services/sdxzj/MapServer/WMSServer",
        params: {'LAYERS':[1],'TILED':true}
    });

    //测试本地数据
    var SzKg2010SourceWMS = new ol.source.TileWMS({
        url: "http://localhost:8080/geoserver/dygh/ows?SERVICE=WMS",
        params: {'LAYERS':'ShouZhan-PianQu-2010','TILED':false}
    });
    var ZxcZG2020SourceWMS = new ol.source.TileWMS({
        //name: '中心城总体规划2011-2020，2016年批复',
        url: "http://localhost:8080/geoserver/dygh/wms?SERVICE=WMS",
        params: {'LAYERS':'dygh:zg2020-tif','TILED':false}
    });
    var SLGYSourceWMS = new ol.source.TileWMS({
        name: '胜利公园片区-用地规划图-东一路东二路北二路北一路',
        url: "http://localhost:8080/geoserver/dygh/wms?SERVICE=WMS",
        params: {'LAYERS':'ShengLiGongYuan-PianQu','TILED':false}
    });
    var SLYYJSourceWMS = new ol.source.TileWMS({
        name: '胜利医院片区-用地规划图-近期-东一路东二路潍坊路北二路',
        url: "http://localhost:8080/geoserver/dygh/wms?SERVICE=WMS",
        params: {'LAYERS':'SLYY-PianQu-J','TILED':false}
    });
    var SLYYYSourceWMS = new ol.source.TileWMS({
        name: '胜利医院片区-用地规划图-近期-东一路东二路潍坊路北二路',
        url: "http://localhost:8080/geoserver/dygh/wms?SERVICE=WMS",
        params: {'LAYERS':'SLYY-PianQu-Y','TILED':false}
    });
    var WHSourceWMS = new ol.source.TileWMS({
        name: '望海片区-用地规划图-杭州路华山路北二路北一路',
        url: "http://localhost:8080/geoserver/dygh/wms?SERVICE=WMS",
        params: {'LAYERS':'WangHai-PianQu','TILED':false}
    });
    var JJLYSourceWMS = new ol.source.TileWMS({
        name: '金基林语片区-用地规划图-华山路东一路北二路北一路-2016',
        url: "http://localhost:8080/geoserver/dygh/wms?SERVICE=WMS",
        params: {'LAYERS':'HuaShanDongYI-BeiYiEr','TILED':false}
    });
    var YYKSourceWMS = new ol.source.TileWMS({
        name: '原油库片区-用地规划图-西四路西二路黄河路南一路',
        url: "http://localhost:8080/geoserver/dygh/wms?SERVICE=WMS",
        params: {'LAYERS':'YuanYouKu-PianQu','TILED':false}
    });
    var HCZSourceWMS = new ol.source.TileWMS({
        name: '火车站片区-用地规划图-西五路西四路北一路枣庄路',
        url: "http://localhost:8080/geoserver/dygh/wms?SERVICE=WMS",
        params: {'LAYERS':'HuoCheZhan-PianQu','TILED':false}
    });
    
    var sdtdTileWMTS = new ol.layer.Tile({
        title: "山东矢量图",
        source: sdtdsourceWMTS
    });
    var sdRasterTileWMTS = new ol.layer.Tile({
        title: "山东影像地图",
        visible: false,
        source: sdRsterSourceWMTS
    });
    var sdtdWMS = new ol.layer.Tile({
        title: "山东行政区划图",
        source: sdtdsourceWMS
    });
    var sdRSAnnoWMTS = new ol.layer.Tile({
        title: "山东影像注记",
        visible: false,
        source: sdRSAnnoSourceWMTS
    });
    var sddyRSAnnoWMTS = new ol.layer.Tile({
        title: "东营影像注记",
        visible: false,
        source: sddyRSAnnoSourceWMTS
    });
    var SzKg2010TileWMS = new ol.layer.Tile({
        title: '首站片区控规2010',
        visible: false,
        source: SzKg2010SourceWMS
    });
    var ZxcZG2020TileWMS = new ol.layer.Tile({
        title: '中心城总体规划2020',
        visible: false,
        source: ZxcZG2020SourceWMS
    });
    var SLGYTileWMS = new ol.layer.Tile({
        title: '胜利公园片区',
        visible: false,
        source: SLGYSourceWMS
    });
    var SLYYJTileWMS = new ol.layer.Tile({
        title: '胜利医院片区-近期',
        visible: false,
        source: SLYYJSourceWMS
    });
    var SLYYYTileWMS = new ol.layer.Tile({
        title: '胜利医院片区-远期',
        visible: false,
        source: SLYYYSourceWMS
    });
    var WHTileWMS = new ol.layer.Tile({
        title: '望海片区',
        visible: false,
        source: WHSourceWMS
    });
    var JJLYTileWMS = new ol.layer.Tile({
        title: '金基林语片区',
        visible: false,
        source: JJLYSourceWMS
    });
    var YYKTileWMS = new ol.layer.Tile({
        title: '原油库片区',
        visible: false,
        source: YYKSourceWMS
    });
    var HCZTileWMS = new ol.layer.Tile({
        title: '火车站片区',
        visible: false,
        source: HCZSourceWMS
    });
    
    var sdtdWFS = new ol.layer.Vector({
        
        //该source不能使用ol.source.VectorSource({})
        source: new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            url: 'http://124.128.48.217:6080/arcgis/services/tdt_tourist_wfs/MapServer/WFSServer',
            //strategy: ol.loadingstrategy.bbox()
        }),
        
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 255, 1.0)',
                width: 2
            })
        })
    });
    /*
    //sdtdTileWMTS 不是layers，应注意
    var layers = [
        new ol.layer.Tile({
            source: sdtdsourceWMTS,
        }),
        new ol.layer.Tile({
            source: testWMS
        })
    ];
    */
    var view = new ol.View({
        //projection 必须有
        projection: projection,
        center: [118.6691236495, 37.4337136745],
        zoom: 15,
        maxZoom: 18,
        minZoom:8
    });
    
    var specialdLayers = new ol.layer.Group({
        title: "用地现状",
        visible: true,
        openInLayerSwitcher: false,
        layers: [SzKg2010TileWMS,JJLYTileWMS]
    });
    
    var specialLayers = new ol.layer.Group({
        title: "已批控规",
        visible: true,
        openInLayerSwitcher: false,
        layers: [SzKg2010TileWMS,JJLYTileWMS]
    });
    
    var specialNoLayers = new ol.layer.Group({
        title: "未批控规",
        visible: true,
        openInLayerSwitcher: false,
        layers: [SLGYTileWMS,SLYYJTileWMS,SLYYYTileWMS,WHTileWMS,YYKTileWMS,HCZTileWMS]
    });
    // A group layer for base layers
	var baseLayers = new ol.layer.Group(
		{   title: '基础底图',
		    //Group的property(属性)openInLayerSwitcher,true表示展开，false表示关闭
			openInLayerSwitcher: true,
			layers: [sdtdTileWMTS,sdRasterTileWMTS,sdRSAnnoWMTS,sddyRSAnnoWMTS,sdtdWMS],
		});
	// A layer with minResolution (hidden on hight zoom level)
	var mapbox = new ol.layer.Tile(
		{	title: "Pirate Map", 
			displayInLayerSwitcher: false,
			minResolution: 1223,
    		source: new ol.source.XYZ(
				{	attributions: [
						'&copy; <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ',
						ol.source.OSM.ATTRIBUTION
					],
					url: 'https://{a-d}.tiles.mapbox.com/v3/aj.Sketchy2/{z}/{x}/{y}.png'
    			})
		});
	// An overlay that stay on top
	var labels = new ol.layer.Tile(
				{	title: "Labels (on top)",
					allwaysOnTop: true,			// Stay on top of layer switcher
					noSwitcherDelete: true,		// Prevent deleting from layer switcher
					source: new ol.source.Stamen({ layer: 'terrain-labels' })
				});
	// WMS with bbox
	var brgm = new ol.layer.Tile (
	{	"title": "GEOLOGIE",
		"extent": [
			-653182.6969582437,
			5037463.842847037,
			1233297.5065495989,
			6646432.677299531
		],
		"minResolution": 3.527777777777778,
		"maxResolution": 3527.777777777778,
		"source": new ol.source.TileWMS({
			"url": "https://geoservices.brgm.fr/geologie",
			"projection": "EPSG:3857",
			"params": {
				"LAYERS": "GEOLOGIE",
				"FORMAT": "image/png",
				"VERSION": "1.3.0"
			},
			"attributions": [
				"<a href='http://www.brgm.fr/'>&copy; Brgm</a>"
			]
		})
	});

	// The Map
	var map = new ol.Map
		({	target: 'map',
			view: view,
			controls: ol.control.defaults().extend
			([	// Add a new Layerswitcher to the map
				new ol.control.LayerSwitcher(),
				new ol.control.MousePosition(),
				new ol.control.ScaleLine(),
				new ol.control.FullScreen(),
			]),
			layers: [ baseLayers , ZxcZG2020TileWMS , specialLayers, specialNoLayers, mapbox ]
		});

})();
