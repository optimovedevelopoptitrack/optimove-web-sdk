'use strict'

var optimoveSDK = function(){
    var _version = "1.0.5";
    var _sdkDomain = "http://sdk-cdn.optimove.net/";
    var _configuration;
    var _userId = null;
    var _userEmail;

    var logger = function(){
        var _levels = {"info" : 1, "error" : 2, "none" : 3}
        var _loggerLevel = "none" //  "none" | "info" | "error"

        var _setLogLevel = function (logLevel) {
            _loggerLevel = logLevel;
        }

        var _log = function(level, message) {
            if (_levels[level] >= _levels[_loggerLevel]) {
                console.log(message)
            }
        }

        return {
            setLevel: _setLogLevel,
            log : _log
        }
    }()

    var init = function(token, confversion, callback, logLevel){
        if(logLevel){
            logger.setLevel(logLevel);
        }
        //load script
        var configurationURL = _sdkDomain  + "webconfig/" + token + "/"+ confversion+".js";
        loadScript(configurationURL, function () {
            logger.log("info", "configuration loaded successfully");
            setConfiguration(callback);
        })
    }

    var setConfiguration = function(callback){
        _configuration = optimoveTenantConfiguration;
        // check if Optitrack enabled
        if(_configuration.enableOptitrack){
            optitrackModule.initializeOptiTrack(logger, _configuration, callback);
        }else {
            callback(true);
        }

        if(_configuration.enableGDN){
            // load optitrack
        }
    }

    var loadScript = function(url, callback){
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (script.readyState){  //IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    var validateEvent = function(eventName, parameters){
        var validEvent = {};

        if(!_configuration.events[eventName]){
            logger.log("info", "event:" + eventName +" does node exsits");
            return false;
        }else{
            validEvent["userId"] = null;
            validEvent["visitorData"] = null;
            validEvent["eventName"] = eventName;
            validEvent["eventMetadata"]= _configuration.events[eventName];
            validEvent["parameters"] = {};
            var event = _configuration.events[eventName];
            for(var parameterName in event.parameters ){
                var paramMetadata = event.parameters[parameterName];
                if(paramMetadata.optional == false && parameters[parameterName] == undefined){
                    logger.log("info", "required paramMetadata '"+ parameterName +"' is missing");
                    return false;
                }else if(parameters[parameterName] != undefined){ 
                    if(paramMetadata.type == "String" && typeof(parameters[parameterName]) != "string" ){
                        logger.log("info", "parameter '"+ parameterName +"' should be type of String")
                        return false;
                    }else if(paramMetadata.type == "Number" && typeof(parameters[parameterName]) != "number" ){
                        logger.log("info", "parameter '"+ parameterName +"' should be type of number")
                        return false
                    }else if(paramMetadata.type == "Boolean" && typeof(parameters[parameterName]) != "boolean" ){
                        logger.log("info", "parameter '"+ parameterName +"' should be type of boolean")
                        return false
                    }
                }

                validEvent["parameters"][parameterName] = { value : parameters[parameterName] , metadata : paramMetadata}
            }
        }

        return validEvent;
    }

    var normalizeEventParameters = function (event_parameters){
        var parameterNames = Object.getOwnPropertyNames(event_parameters);
        parameterNames.forEach(function (paramName) {
            var currParamValue = event_parameters[paramName];
            if(typeof currParamValue == "string")
                {
                    var normalizedValue = currParamValue.trim();
                    normalizedValue = normalizedValue.toLowerCase();
                    event_parameters[paramName] = normalizedValue; 
                }          
        })
    }

    var getVisitorsInfoObj = function(){

        var visitorsInfo = optitrackModule.getOptitrackVisitorInfo();
        var visitorInfoObject = new Object();
       
        if(visitorsInfo != undefined ){
            
            visitorInfoObject.visitorId = visitorsInfo[1];
            visitorInfoObject.visitCount = visitorsInfo[3];
                
        }else{
                logger.log("error","in getVisitorsInfoObj Optitrack");
                visitorInfoObject = undefined;
        } 

        return visitorInfoObject;      
    }

    var reportEvent = function(eventName, parameters){
        try{
            var validEvent = validateEvent(eventName, parameters);
            if(validEvent){
                 normalizeEventParameters(parameters);
                if(_configuration.enableOptitrack){
                    try{
                        logger.log("info","in reportEvent Optitrack");
                        optitrackModule.logEvent(eventName, parameters);
                    }catch(err){
                        logger.log("error", err);            
                    }
                }
                if(_configuration.enableRealtime && validEvent.eventMetadata.supportedOnRealTime){
                    reportEventRealtime(validEvent);  
                }      
            }
        }catch(err){
            logger.log("error", err);
        }
    }
    

    var reportEventRealtime = function(validEvent){
       logger.log("info","in reportEvent Real time");
              
       if(_userId != undefined){
        validEvent.userId = _userId; // -Gil I think this is redundant
       }
       
        if(_configuration.enableOptitrack && _configuration.enableVisitors){

            validEvent.visitorData = getVisitorsInfoObj();

        }else if(!_userId){
            logger.log("info", "parameter userId is required, please call setUserId method")
            return false;
        }
        
        realTimeModule.reportEvent(validEvent);        
    }

    var realTimeModule = function(){
        var _popup;
        var objToParams = function (obj) {
            var paramString = '';
            for (var key in obj) {
                var value = obj[key] ? obj[key] : "";
                if (obj[key] instanceof Array) {
                    value = encodeURIComponent(JSON.stringify(value));
                }

                if (paramString != "") paramString += "&";
                paramString += key + "=" + encodeURIComponent(value);
            }

            return paramString;
        }

        var closePopup = function (element) {
            if (element) {
                if (element.target == document.getElementById("optiRealPopupDimmer")) {
                    document.body.removeChild(_popup);
                    document.removeEventListener("mousedown", closePopup);
                }
                if (element.target.id == "optiRealclosePopupImage") {
                    document.body.removeChild(_popup);
                    document.removeEventListener("mousedown", closePopup);
                }
            }
        }

        var executePopup = function (response) {
            try {

                if (response.IsSuccess && response.Data != '') {
                    var popupDiv = document.createElement('div');
                    var divHtml = "";
                    var opacity = _configuration.realtimeMetaData.showDimmer ? 0.5 : 0;
                    divHtml = "<div id='optiRealPopupDimmer' style='position: fixed;bottom: 0;right: 0;top: 0;left: 0;overflow: hidden;display: none; z-index:999999999;background: #000000;opacity : " + opacity + ";display:block;width: auto;height: auto;'></div>";
                    document.addEventListener("mousedown", closePopup);
                    var poweredByHtml = "<div style='position: absolute;z-index:9999999999; clear:both;font-family : Arial;font-size : 9px;color : #CCCCCC;padding-top:6px;margin-left: 5px;'>Powered by Optimove</div>";
                    divHtml += "<div style='max-height:90%;max-width:90%;top: 50%;left: 50%;transform:translate(-50%, -50%);position: fixed;z-index:9999999999;'><div style=' clear:both;min-width: 100px;min-height: 100px;background-color:white; text-align:center;box-shadow:0 0 5px 0 rgba(0, 0, 0, 0.2);'><div style='position:absolute;right:-13px;top:-13px;cursor:pointer;z-index:99999999999; color:white' onclick='OptiRealApi.closePopup();'><img id='optiRealclosePopupImage' src='https://d3qycynbsy5rsn.cloudfront.net/banner_pop_x.png' /></div><div style='border-style: solid;border-width: 5px;border-radius:5px; border-color:white;' >" + response.Data + "</div></div>"
                        + (_configuration.realtimeMetaData.showDimmer && _configuration.realtimeMetaData.showWatermark ? poweredByHtml : "") + "</div>";
                    popupDiv.innerHTML = divHtml;
                    _popup = popupDiv;
                    document.body.appendChild(popupDiv);
                }
            }
            catch (e) {
                logger.log("error", "Error while executing popup");
            }
        }       

        var callRealtimeAsync = function (event, data, callback) {
            var paramsString = objToParams(data);
            var xmlhttp = new XMLHttpRequest();
            var url =  _configuration.realtimeMetaData.realtimeGateway.lastIndexOf('/') == _configuration.realtimeMetaData.realtimeGateway.length -1 ?
                _configuration.realtimeMetaData.realtimeGateway + event :
                _configuration.realtimeMetaData.realtimeGateway + '/' + event;
            xmlhttp.open("POST", url, true);
            xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
            xmlhttp.onreadystatechange = function() {
                try{
                    if (xmlhttp.readyState == XMLHttpRequest.DONE && xmlhttp.status == 200) {
                        var responseData = JSON.parse(this.responseText);
                        if (_configuration.realtimeMetaData.popupCallBack) {
                            _configuration.realtimeMetaData.popupCallBack(response);
                        }
                        else{
                             executePopup(responseData);
                        }
                    
                    }
                }catch(err){
                    logger.log("error", err);
                }
            };

            xmlhttp.send(paramsString);
        }        

        var reportEvent = function (event) {
            var params = {};
            for(var eventParam in event.parameters){
                params[eventParam] = event.parameters[eventParam].value;
            }

            callRealtimeAsync("reportEvent", {
                    tid : _configuration.realtimeMetaData.realtimeToken,
                    cid : optitrackModule.getUserId(optitrackModule),
                    eid : event.eventMetadata.id,
                    visitorId : event.visitorData ? event.visitorData.visitorId : null,
                    visitCount : event.visitorData ? event.visitorData.visitCount : null,
                    context : JSON.stringify(params)
                },
                function (response) {
                    logger.log("error", "real time report event after call");
                    handleJsonpResponse(response);
                });
        }

        return {
            reportEvent : reportEvent
        }

    }()

    var optitrackModule = function(){
        var _userId 		= null;
        var _ot_endpoint 	= null;
        var _ot_tenantId 	= null;
        var _piwikURL 		= null;
        var _configURL  	= null;
        var _tracker 		= null;
        var _sdkConfig 		= null;
        var _logger         = null;
        var _pageVisitCount = 0;
        // ------------------------------ Event Const Values ------------------------------
        var LogEventCategory_name = 'LogEvent';
        var SetUserIdEvent_name = 'set_user_id_event';
        var SetEmailEvent_name = 'Set_email_event';
        var StitchUsersEvent_name = 'stitch_event';
        var PageCategoryEvent_name = 'page_category_event';
        var UserAgentHeaderEvent_name =  'user_agent_header_event';
        var email_param_name = "email";
        var originalVisitorId_param_name = "originalVisitorId";
        var userId_param_name = "userId";
        var updatedVisitorId_param_name = "updatedVisitorId";
        var clientCustomerIDKey = '215d26f4be2047f348066e44ee7fe3d6';
        var userAgentIDKey = '11602c8b76fe7626ca586081b94892e4';
        var enableLinkTrackingIDKey = '79352f4d05f73d22c209bbe4689dbaca'; 
        // ------------------------------ SDK public member functions ------------------------------

        // ---------------------------------------
        // Function: initialize
        // Args: logger - log object.
        // callback_ready - callback when initialization finished successfuly
        // Gets the Optimove SDK Verion
        // ---------------------------------------
        var initializeOptiTrack = function (logger, SDKConfig, callback_ready) {
            _logger = logger;
            _sdkConfig = SDKConfig;
            LogEventCategory_name = _sdkConfig.optitrackMetaData.eventCategoryName;
            _ot_endpoint = getOptiTrackEndpointFromConfig(SDKConfig)
            _ot_tenantId = getOptiTrackTenantIdFromConfig(SDKConfig);
            _piwikURL = buildPiwikResourceURL(SDKConfig);
            var tracker  = loadOptiTrackJSResource(this, _piwikURL, callback_ready);

        };

        // ---------------------------------------
        // Function: setUserId
        // Args: updatedUserId
        // Log User Public Id
        // ---------------------------------------
        var setUserId = function (updatedUserId) {
            setOptitrackUserId(this, updatedUserId);
        }

        // ---------------------------------------
        // Function: logPageVisitEvent
        // Args:
        // Gets the Optimove SDK Verion
        // ---------------------------------------
        var logPageVisitEvent = function (customURL, pageTitle, category) {
            logOptitrackPageVisit(this, customURL, pageTitle, category);
        }

        // ---------------------------------------
        // Function: logUserEmail
        // Args: email
        // Log User email
        // ---------------------------------------
        var logUserEmail = function (email) {
            this.logOptitrackUserEmail(this, email);
        }

        // ---------------------------------------
        // Function: logEvent
        // Args: eventId, eventParameters
        // Log Custom Event
        // ---------------------------------------
        var logEvent = function (eventId, eventParameters) {
            logOptitrackCustomEvent(this,eventId, eventParameters);
        }

        // ------------------------------ Optitrack Private member functions ------------------------------


        // ---------------------------------------
        // Function: logOptitrackCustomEvent
        // Args: category, action, name, value
        // Sets the Event in Optitrack Infrastructure
        // Flow: Go through the event configuration definition.
        // Per each parameter we chech whether it exist and if so.
        // What is the optiTrackDimensionId we should use for it in the custom Dimension.
        // if the optiTrackDimensionId = -1 we define the parameter not to be delivered to the Optitrack.
        // ---------------------------------------
        var  logOptitrackCustomEvent = function (THIS, eventId, event_parameters) {

            
            if(event_parameters == undefined)
            {
                return false;
            }
            try{
                cleanCustomDimensions(); // cleaning the previous usage
                var numOfAddedParams = 0;
                var eventConfig = _sdkConfig.events[eventId];
                var parameterConfigsNames = Object.getOwnPropertyNames(eventConfig.parameters);
                var numOfConfiguredParameters = parameterConfigsNames.length;

                parameterConfigsNames.forEach(function (paramName) {
                    var currParamConfig = eventConfig.parameters[paramName];
                    // Check if the parameter is given in the Event Argumen
                    if(event_parameters[paramName] != undefined && currParamConfig.optiTrackDimensionId > 0  )
                    {
                        var paramValue = event_parameters[paramName];
                        if(currParamConfig.type == "Boolean"){
                           if(paramValue == true) 
                            paramValue = 1;
                           else  
                            paramValue = 0;
                        }
                        if( paramValue != undefined)
                        {
                            numOfAddedParams++;
                            _tracker.setCustomDimension(currParamConfig.optiTrackDimensionId, paramValue);
                        }
                    }
                });

                if(typeof _tracker != 'undefined')
                {

                    var configEventId = eventConfig.id;
                    var eventName = eventId;
                    _tracker.setCustomDimension(_sdkConfig.optitrackMetaData.eventIdCustomDimensionId, configEventId);
                    _tracker.setCustomDimension(_sdkConfig.optitrackMetaData.eventNameCustomDimensionId, eventName);

                    _tracker.trackEvent(LogEventCategory_name, eventId);
                    return true;
                }else{
                    throw "OptiTrackModule:_tracker is undefined !!";
                }
            }catch(error){
                throw "OptiTrackModule:logOptitrackCustomEvent Failed!!, error =  " + error;
            }

        };

        // ---------------------------------------
        // Function: logOptitrackPageVisit
        // Args: pageURL, pageTitle, category
        // Send Optitrack Infrastructure with the Loading Page Event.
        // ---------------------------------------
        var logOptitrackPageVisit = function (THIS, pageURL, pageTitle, category) {

            try{
                var isValidURL = validatePageURL(pageURL);

                if(_tracker == undefined){


                }
                updateContextUserId(THIS);

                if(_sdkConfig.isSPASite == true)
                {
                    _pageVisitCount++;
                    if(_pageVisitCount > 1)
                    {
                        _tracker.setGenerationTimeMs(0);
                    }
                }

                if(isValidURL == false)
                {
                    throw 'customURL-' + pageURL  + 'is not a valid URL';
                }              

                _tracker.enableLinkTracking( true );
                // if(_sdkConfig.optitrackMetaData.enableHeartBeatTimer == true )
                // {
                //     _tracker.enableHeartBeatTimer(_sdkConfig.optitrackMetaData.heartBeatTimer);
                // }

                _tracker.setCustomUrl(pageURL);

                if(typeof pageTitle != 'undefined' && pageTitle != null)
                {
                    _tracker.trackPageView(pageTitle);
                }else{

                    _tracker.trackPageView();
                }

                if(typeof category != 'undefined')
                {
                    logPageCategoryEvent(THIS,category);
                }

                if(_sdkConfig.optitrackMetaData.sendUserAgentHeader == true)
                {
                    logUserAgentHeaderEvent(THIS);
                }

                if(_sdkConfig.supportUserEmailStitch == true)
                {
                    processEmailStitch(THIS, customURL);
                }
            }catch(error){

                throw "OptiTrackModule:logOptitrackPageVisit Failed!!, error =  " + error;
            }
        };

        // ---------------------------------------
        // Function: processEmailStitch
        // Args: pageURL
        // Sets the email in Optitrack Infrastructure
        // the Stitch will try to find th estitch data in
        // both the URL supplied by the PageVisit event and the
        // URL extracted from the window.location
        // ---------------------------------------
        var processEmailStitch = function (THIS, pageURL) {
            // We might have not Load the Piwik Yet
            
            var stitchDataFound = false;
            var stitchEvent = "stitchEvent"
            var sourcePublicCustomerId = "sourcePublicCustomerId";
            var sourceVisitorId = "sourceVisitorId";
            var targetVsitorId = "targetVsitorId";
            var stitchData = {}
            
            var sourcePCIDParamConfig = null;
            var sourceVisitorIdParamConfig = null;
            var targetVsitorIdIdParamConfig = null;
            try {

                var eventConfig = getCustomEventConfigById(StitchUsersEvent_name);

                if(eventConfig != null)
                {
                    sourcePCIDParamConfig = getCustomEventParamFromConfig(eventConfig, sourcePublicCustomerId);
                    sourceVisitorIdParamConfig = getCustomEventParamFromConfig(eventConfig, sourceVisitorId);
                    targetVsitorIdIdParamConfig = getCustomEventParamFromConfig(eventConfig, targetVsitorId);
                }

                var pageStitchData = getOptimoveStitchData(pageURL);
                if(pageStitchData.OptimoveStitchDataExist == false)
                {
                    var browserURL = window.location.pathname;
                    var browserStitchData = getOptimoveStitchData(browserURL);
                    if(browserStitchData.OptimoveStitchDataExist == true)
                    {
                        stitchData  = browserStitchData;
                        stitchDataFound = true;
                    }
                }else{
                    stitchData  = pageStitchData;
                    stitchDataFound = true;
                }

                if (stitchData == true && typeof _tracker != 'undefined')
                {
                    cleanCustomDimensions(); // cleaning the previous usage
                    var numOfParams = 0;
                    var targetVisitorId = _tracker.getVisitorId();
                    if(stitchData.OptimovePublicCustomerId != null)
                    {
                        if(sourcePCIDParamConfig.optiTrackDimensionId > 0){
                            numOfParams++;
                            _tracker.setCustomDimension(sourcePCIDParamConfig.optiTrackDimensionId, stitchData.OptimovePublicCustomerId);
                        }
                    }else{

                        if(sourceVisitorIdParamConfig.optiTrackDimensionId > 0){
                            numOfParams++;
                            _tracker.setCustomDimension(sourceVisitorIdParamConfig.optiTrackDimensionId, stitchData.OptimovePublicCustomerId);
                        }
                    }
                    if(targetVsitorIdIdParamConfig.optiTrackDimensionId > 0){
                        numOfParams++;
                        _tracker.setCustomDimension(targetVsitorIdIdParamConfig.optiTrackDimensionId, stitchData.OptimovePublicCustomerId);
                    }

                    var configEventId = eventConfig.id;
                    var eventName = StitchUsersEvent_name;
                    _tracker.setCustomDimension(_sdkConfig.optitrackMetaData.eventIdCustomDimensionId, configEventId);
                    _tracker.setCustomDimension(_sdkConfig.optitrackMetaData.eventNameCustomDimensionId, eventName);

                    _tracker.trackEvent(LogEventCategory_name, StitchUsersEvent_name)
                }
             } catch (error) {
                throw "OptiTrackModule:processEmailStitch Failed!!, error =  " + error;
            }
        };

        // ---------------------------------------
        // Function: getOptimoveStitchData
        // Args: URL
        // Gets the data from the URL which is used by
        // Optimove Stitch Flow.
        // return - JSON obj containng the optimovePublicCustomerId
        //  and the status.
        // ---------------------------------------
        var  getOptimoveStitchData = function(currURL)
        {
            // We might have not Load the Piwik Yet
            var jsonData = {};
            jsonData["OptimoveStitchDataExist"] = false;
            var optimovePublicCustomerId 	= "OptimovePublicCustomerId";
            var optimoveVisitorId 			= "optimoveVisitorId";
            var optimoveStitchFlow 			= "OptimoveStitchFlow";
            var optimoveStitchDataExist 	= "OptimoveStitchDataExist";
            var isStitchFlow 				= false;
            try {
                var parts = currURL.split('&');
                if(parts.length > 0)
                {
                    parts.forEach(function(item, index) {
                        if(item.search(optimoveStitchFlow) > -1)
                        {
                            isStitchFlow = item.slice(optimoveStitchFlow.length+1) == 'true';
                        }else{
                            isStitchFlow = false;
                        }

                        if(isStitchFlow == true)
                        {
                            if(item.search(optimovePublicCustomerId)  > -1)
                            {
                                var publicCustomerId = item.slice(optimovePublicCustomerId.length+1)
                                jsonData[optimovePublicCustomerId] = publicCustomerId;
                            }
                            if(item.search(optimoveVisitorId)  > -1)
                            {
                                var vistorId = item.slice(optimoveVisitorId.length+1)
                                jsonData[optimoveVisitorId] = vistorId;
                            }

                            jsonData[optimoveStitchDataExist] = true;
                        }
                    })
                }
            } catch (error) {
                throw "OptiTrackModule:getOptimoveStitchData Failed!!, error =  " + error;
            }
            return jsonData;
        };

        // ---------------------------------------
        // Function: logPageCategoryEvent
        // Args: email - the User email
        // Sets the email in Optitrack Infrastructure
        // ---------------------------------------
        var logPageCategoryEvent= function (THIS, category){

            logOptitrackCustomEvent(THIS,PageCategoryEvent_name, {category: category});

        };                

        // ---------------------------------------
        // Function: logUserAgentHeaderEvent
        // Args: None
        // Sets the UserAgent of the Current Browser
        // ---------------------------------------
        var logUserAgentHeaderEvent= function (THIS){

            try{
                var userAgenteHeaderPersisted = getPersistedSDKSessionData(THIS, userAgentIDKey);
                if(userAgenteHeaderPersisted != null){
                    _logger.log('info', 'User-Agent Header Already triggered');
                    return;
                }
                if(typeof navigator != 'undefined' && typeof navigator.userAgent != 'undefined' ){
                    logOptitrackCustomEvent(THIS,UserAgentHeaderEvent_name, {user_agent_header: navigator.userAgent});
                    persistSDKSessionData(THIS, userAgentIDKey, true);
                }
            }catch(error){
                throw "OptiTrackModule:logUserAgentHeaderEvent Failed!!, error =  " + error;
            }
           
        };

        // ---------------------------------------
        // Function: logOptitrackUserEmail
        // Args: email - the User email
        // Sets the email in Optitrack Infrastructure
        // ---------------------------------------
        var logOptitrackUserEmail = function (THIS, emailValue) {
            try {
                var isValidEmail = validateEmail(email);
                if (isValidEmail == false) {
                    throw 'email ' + email + ' is not valid';
                }

                logOptitrackCustomEvent(THIS,SetEmailEvent_name, {email: email});

            } catch (error) {
                throw "OptiTrackModule:logOptitrackUserEmail Failed!!, error =  " + error;
            }
        };

        // ---------------------------------------
        // Function: setOptitrackUserId
        // Args: currUserId - the public User Id
        // Sets the in Optitrack Infrastructure User ID
        // ---------------------------------------
        var setOptitrackUserId = function (THIS, updatedUserId) {
            var isValid = validateUserId(updatedUserId);
            try {
                if (isValid == true && _userId == null) {

                    persistUserId(THIS, updatedUserId);

                    // We might have not Load the Piwik Yet
                    if (typeof _tracker != 'undefined') {
                        var existUserId = _tracker.getUserId();
                        if(existUserId != updatedUserId)
                        {
                            var origVisitorId = _tracker.getVisitorId();
                            _tracker.setUserId(updatedUserId);
                            _userId = updatedUserId;
                            var updatedVisitorId = _tracker.getVisitorId();
                            logSetUserIdEvent(THIS, origVisitorId, updatedUserId, updatedVisitorId);
                        }
                    }
                }
            } catch (error) {
                throw "OptiTrackModule:setOptitrackUserId Failed!!, error = " +  error;
            }
        };

        // ---------------------------------------
        // Function: logSetUserIdEvent
        // Args: THIS, origVisitorId, updatedUserId
        // Sets the in Optitrack Infrastructure User ID
        // ---------------------------------------
        var logSetUserIdEvent = function (THIS, origVisitorIdValue, updatedUserIdValue, updatedVisitorIdValue) {
            try {
                var eventConfig = getCustomEventConfigById(SetUserIdEvent_name);
                if(eventConfig != null)
                {
                    cleanCustomDimensions(); // cleaning the previous usage
                    var originalVisitorIdConfig = getCustomEventParamFromConfig(eventConfig, originalVisitorId_param_name);
                    var updatedVisitorIdConfig = getCustomEventParamFromConfig(eventConfig, updatedVisitorId_param_name);
                    var userIdParamConfig = getCustomEventParamFromConfig(eventConfig, userId_param_name);

                    var eventId = eventConfig.id;
                    var eventName = SetUserIdEvent_name;
                    _tracker.setCustomDimension(_sdkConfig.optitrackMetaData.eventIdCustomDimensionId, eventId);
                    _tracker.setCustomDimension(_sdkConfig.optitrackMetaData.eventNameCustomDimensionId, eventName);


                    if(userIdParamConfig != undefined)
                    {
                        _tracker.setCustomDimension(userIdParamConfig.optiTrackDimensionId, updatedUserIdValue);
                    }

                    if(originalVisitorIdConfig != undefined)
                    {
                        _tracker.setCustomDimension(originalVisitorIdConfig.optiTrackDimensionId, origVisitorIdValue);
                    }

                    if(updatedVisitorIdConfig != undefined)
                    {
                        _tracker.setCustomDimension(updatedVisitorIdConfig.optiTrackDimensionId, updatedVisitorIdValue);
                    }

                    _tracker.trackEvent(LogEventCategory_name, SetUserIdEvent_name);
                }

            } catch (error) {
                throw "OptiTrackModule:logSetUserIdEvent Failed!!, error =  " + error;
            }
        };

        // ---------------------------------------
        // Function: enableLinkTracking
        // Args: None
        // calls piwik API enableLinkTracking.
        // this - Install link tracking on all applicable link elements
        // ---------------------------------------
        var enableLinkTracking= function (THIS){
            try{
                var userenableLinkTrackingPersisted = getPersistedSDKSessionData(THIS, enableLinkTrackingIDKey);
                if(userenableLinkTrackingPersisted != null){
                    _logger.log('info', 'user enable Link Tracking Persisted Already triggered');
                    return;
                }else{                    
                    _tracker.enableLinkTracking( true );
                    persistSDKSessionData(THIS, enableLinkTrackingIDKey, true);
                }
            }catch(error){
                throw "OptiTrackModule:enableLinkTracking Failed!!, error =  " + error;
            }
            
            
        };

        // ---------------------------------------
        // Function: getOptitrackVisitorInfo
        // Args: None
        // Sets the Optimove SDK Logging Mode
        // ---------------------------------------
        var getOptitrackVisitorInfo = function (THIS) {
            var visitorInfo = [];
            try {
                if (typeof _tracker != 'undefined') {
                    visitorInfo = _tracker.getVisitorInfo();
                }else{
                    throw  'tracker is not defined';
                }
            }catch (error) {

            }

            return visitorInfo;
        };

        // ------------------------------ Optitrack Private Utility member functions ------------------------------
        // ---------------------------------------
        // Function: getCustomEventConfigById
        // Args: eventId
        // returns the event Configuration.
        // ---------------------------------------
        var getCustomEventConfigById = function(eventId){
            var currEvent = _sdkConfig.events[eventId];
            if(currEvent == undefined)
            {
                return null;
            }
            return currEvent;
        };

        // ---------------------------------------
        // Function: getCustomEventParamFromConfig
        // Args: eventConfig, paramName
        // returns the event Configuration.
        // ---------------------------------------
        var getCustomEventParamFromConfig = function(eventConfig, paramName){
            var currParam = eventConfig.parameters[paramName];
            if(currParam == undefined)
            {
                return null;
            }
            return currParam;
        };

        // ---------------------------------------
        // Function: getOptitrackVisitorInfo
        // Args: updatedUserId
        // Sets the Optimove SDK Logging Mode
        // We will allow to set null as userId,
        // Other values like "Undefined" "null" etc. are invalid
        // inorder to enable reset of the curren userId when logged out
        // ---------------------------------------
        var validateUserId = function(updatedUserId){

            if (typeof updatedUserId == 'undefined' || typeof updatedUserId != 'string' || updatedUserId == undefined || updatedUserId == '' || updatedUserId == 'null' ||  updatedUserId.includes("undefine")) {
                return false;
            }
            else{
                return true;
            }

        };

        // ---------------------------------------
        // Function: validatePageURL
        // Args: email
        // validats  the email with regexpress
        // taken from https://mathiasbynens.be/demo/url-regex
        // the selectd version of: @stephenhay
        // ---------------------------------------
        var  validatePageURL = function (customURL) {

            var regexp = /(https?|http?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;
            return regexp.test(customURL);
        };

        // ---------------------------------------
        // Function: updateContextUserId
        // Args: THIS
        // updates the following Events user Id.
        // This would be done using the sessionStorage which
        // would persist the user ID as signed by t he user.
        // ---------------------------------------
        var updateContextUserId = function(THIS){
            if(_userId == null){
                THIS._userId = getPersistedUserId(THIS);
                if(typeof _tracker != 'undefined' && THIS._userId != null)
                {
                    _tracker.setUserId(THIS._userId);
                    return true;
                }
            }else{
                // allready exist and assigned.

            }
            return false;
        };

        // ---------------------------------------
        // Function: persistSDKSessionData
        // Args: key, updatedValue
        // persists the key, updatedValue in the sessionStorage for session TLV
        // ---------------------------------------
        var persistSDKSessionData = function (THIS, key, updatedValue)
        {
            try {
                if(_sdkConfig.optitrackMetaData.useSessionStorage == true){
                    var currValue = sessionStorage.getItem(key);
                    if( currValue == null || currValue != updatedValue){
                        sessionStorage.setItem(key, updatedValue );
                    }
                }else{
                    _logger.log("info","Optitrack: persistSDKSessionData()  Not  Persisted");
                }
            } catch (error) {
                _logger.log("error","Optitrack: persistSDKSessionData()  Failed error = " + error);
            }
        };

        // ---------------------------------------
        // Function: getPersistedSDKSessionData
        // Args: key
        // persists the key, updatedValue in the sessionStorage for session TLV
        // ---------------------------------------
        var getPersistedSDKSessionData = function (THIS, key)
        {
            try {
                if(_sdkConfig.optitrackMetaData.useSessionStorage == true){
                    var value = sessionStorage.getItem(key);
                    if( value != null){
                        var resultObject =
                            {
                                key : key,
                                value : value,
                            };
                        return resultObject;
                    }
                }else{
                    _logger.log("info","Optitrack: persistSDKSessionData()  key:" + key  + " Not Persisted");
                    return null;
                }
            } catch (error) {
                _logger.log("error","Optitrack: persistSDKSessionData()  Failed error = " + error);
                return null;
            }
        };
        // ---------------------------------------
        // Function: persistUserId
        // Args: updatedUserId
        // persists the USerId for usage in sabsequent pages in case the
        // User does not calls it appropriatly.
        // ---------------------------------------
        var persistUserId = function (THIS, updatedUserId)
        {
            persistSDKSessionData(THIS, clientCustomerIDKey, updatedUserId);
        };

        // ---------------------------------------
        // Function: getPersistedUserId
        // Args: None
        // Get persists the UserId for usage.
        // ---------------------------------------
        var getPersistedUserId = function (THIS)
        {
            var clientCustomerIDKeyValue = getPersistedSDKSessionData(THIS, clientCustomerIDKey);
            if( clientCustomerIDKeyValue != null){

                return clientCustomerIDKeyValue.value;
            }

        };

        // ---------------------------------------
        // Function: validateEmail
        // Args: email
        // validats  the email with regexpress
        // ---------------------------------------
        var  validateEmail = function (email) {
            var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regexp.test(email);
        };

        // ---------------------------------------
        // Function: loadJSResource
        // Args:url, callback
        // Handle the User Options to update the current SDK Object.
        // ---------------------------------------
        var loadJSResource = function (THIS, resourceURL, callback) {
            if(resourceURL != null)
            {
                var d = document;
                var g = d.createElement('script');
                var s = d.getElementsByTagName('script')[0];
                g.type = 'text/javascript';
                g.async = true;
                g.defer = true;
                g.src = resourceURL;
                g.onload= callback ;
                s.parentNode.insertBefore(g, s);
            }
        };

        // ---------------------------------------
        // Function: loadOptiTrackJSResource
        // Args:url, callback
        // Handle the User Options to update the current SDK Object.
        // ---------------------------------------
        var loadOptiTrackJSResource = function (THIS, resourceURL, callback) {
            if(resourceURL != null)
            {
                var d = document;
                var g = d.createElement('script');
                var s = d.getElementsByTagName('script')[0];
                g.type = 'text/javascript';
                g.async = true;
                g.defer = true;
                g.src = resourceURL;
                g.onload= function(){ handleTrackerLoadedCB(THIS,callback) } ;
                s.parentNode.insertBefore(g, s);
            }
        };

        // ---------------------------------------
        // Function: handleTrackerLoadedCB
        // Args: callback
        // Load the Tracker JS resource, and then call the callback
        // ---------------------------------------
        var handleTrackerLoadedCB = function (THIS, callback){
            _tracker = createOptitrackTracker();
            handleInitializationFinished(THIS,_tracker, callback);
        };

        // ---------------------------------------
        // Function: handleInitializationFinished
        // Args: tracker, callback
        // Update client with initialization finshed status
        // ---------------------------------------
        var handleInitializationFinished = function (THIS, tracker, callback){
            if(tracker == null)
                callback(false);
            else
                callback(true);
        };

        // ---------------------------------------
        // Function: createOptitrackTracker
        // Args: SDKConfig
        // create the tracker object
        // ---------------------------------------
        var createOptitrackTracker = function (){
            if (typeof self.Piwik != 'undefined') {
                var tracker = self.Piwik.getAsyncTracker( _ot_endpoint+ 'piwik.php', _ot_tenantId );
                return tracker;
            }else {
                return undefined;
            }
        };

        // ---------------------------------------
        // Function: getOptiTrackEndpointFromConfig
        // Args: SDKConfig
        // Get the Tracker Endpoint from the Config
        // ---------------------------------------
        var getOptiTrackEndpointFromConfig = function (SDKConfig){
            return  SDKConfig.optitrackMetaData.optitrackEndpoint;
        };

        // ---------------------------------------
        // Function: getOptiTrackTenantIdFromConfig
        // Args: SDKConfig
        // Get the siteId from the Config
        // ---------------------------------------
        var getOptiTrackTenantIdFromConfig = function (SDKConfig){

            return   SDKConfig.optitrackMetaData.siteId;
        };

        // ---------------------------------------
        // Function: buildPiwikResourceURL
        // Args: SDKConfig
        // build Tracker endpoint URL.
        // ---------------------------------------
        var buildPiwikResourceURL = function (SDKConfig){
            var piwikURL = getOptiTrackEndpointFromConfig(SDKConfig) + 'piwik.js';
            return piwikURL;
        };

        // ---------------------------------------
        // Function: cleanCustomDimensions
        // Args: none
        // clean the custom Dimensions from previous usage.
        // ---------------------------------------
        var cleanCustomDimensions= function (){
            var customDimensionId = _sdkConfig.optitrackMetaData.actionCustomDimensionsStartId
            var maxActionCustomDimensionsId = _sdkConfig.optitrackMetaData.actionCustomDimensionsStartId + _sdkConfig.optitrackMetaData.maxActionCustomDimensions;
            for( customDimensionId = _sdkConfig.optitrackMetaData.actionCustomDimensionsStartId; customDimensionId <= maxActionCustomDimensionsId  ; customDimensionId++){
                _tracker.deleteCustomDimension (customDimensionId);
            };

        };

        return {
            initializeOptiTrack : initializeOptiTrack,
            logPageVisitEvent : logPageVisitEvent,
            setUserId : setUserId,
            logUserEmail: logUserEmail,
            logEvent : logEvent,
            getOptitrackVisitorInfo: getOptitrackVisitorInfo,
            getUserId: getPersistedUserId

        };



    }();

    var cookieMatcherModule = function(){

        // ---------------------------------------
        // Function: updateCookieMatcher
        // Args: customer userId or null if visitor
        // Sets the Optimove SDK Logging Mode
        // ---------------------------------------
        var updateCookieMatcher = function (userId){

            var setOptimoveCookie = function(cookieMatcherUserId) {
                var setCookieUrl = "https://gcm.optimove.events/setCookie?optimove_id="+cookieMatcherUserId;
                var setCookieNode = document.createElement("img");
                setCookieNode.style.display = "none";
                setCookieNode.setAttribute("src", setCookieUrl);
                document.body.appendChild(setCookieNode);
            };

            var matchCookie = function(tenantId, optimoveCookieMatcherId) {
                //var url = "https://cm.g.doubleclick.net/pixel?google_nid=OptimoveCookieMatcherID&google_cm&tenant_id=TenantID";
                var url = "https://cm.g.doubleclick.net/pixel?google_nid=" + optimoveCookieMatcherId + "&google_cm&tenant_id=" +tenantId;
                var node = document.createElement("img");
                node.style.display = "none";
                node.setAttribute("src", url);
                document.body.appendChild(node);
            };

            var cookieMatcherUserId = null;
            if(typeof userId != 'undefined' && userId != null)
            {
                cookieMatcherUserId = userId;
            }else{
                var info  = getVisitorsInfoObj();
                cookieMatcherUserId = info.visitorId;
            }

            setOptimoveCookie(cookieMatcherUserId);

            var siteId = _configuration.optitrackMetaData.siteId;
            matchCookie(siteId, _configuration.cookieMatcherMetaData.optimoveCookieMatcherId);
        };

        return {
            updateCookieMatcher : updateCookieMatcher,
        };
    }();

    

    var _API = {
        getVersion : function(){
            return _version;
        },
        getConfigurationVersion : function(){
            return _configuration.version;
        },
        reportEvent : reportEvent,
        
        setRealTimeOptions : function(options){
            if(options.showDimmer != null){
                _configuration.realtimeMetaData.showDimmer = options.showDimmer;
            }

            if(options.showWatermark != null){
                _configuration.realtimeMetaData.showWatermark = options.showWatermark;
            }

            if(options.reportEventCallback != null){
                _configuration.realtimeMetaData.popupCallBack = reportEventCallback;
            }    
        },
        setUserId : function(updatedUserId){
            _userId = updatedUserId.trim();
            if(_configuration.enableOptitrack){
                logger.log("info","call setUserId Optitrack");
                optitrackModule.setUserId(_userId);
            }

            if(_configuration.supportCookieMatcher == true)
            {
                cookieMatcherModule.updateCookieMatcher(_userId);
            }

        },
        setUserEmail : function(email){
            _userEmail = email.trim();
            if(_configuration.enableOptitrack){
                try{
                    logger.log("info","call setUserEmail Optitrack");
                    optitrackModule.logUserEmail(_userEmail);
                }catch(err){
                    logger.log("error", err);
                }
            }

            if(_configuration.enableRealtime){
                var event = validateEvent("Set_email_event", {email: _userEmail});
                reportEventRealtime(event);
            }
        },
        setPageVisit : function(customURLIn, pageTitleIn, categoryIn){
            var customURL = customURLIn.trim();
            var pageTitle = pageTitleIn.trim();
            var category = categoryIn.trim();

            if(_configuration.enableOptitrack){
                logger.log("info","call setPageVisit Optitrack");
                optitrackModule.logPageVisitEvent(customURL, pageTitle, category);
            }

            if(_configuration.enableRealtime){
                logger.log("info","call setPageVisit Realtime");
                var event = validateEvent("PageVisit", {customURL: customURL, pageTitle : pageTitle, category : category});
                reportEventRealtime(event);
            }

            if(_configuration.supportCookieMatcher == true)
            {
                cookieMatcherModule.updateCookieMatcher(null);
            }

        }
    }
    
    return {
        initialize : init,
        API : _API,
    }

}();



