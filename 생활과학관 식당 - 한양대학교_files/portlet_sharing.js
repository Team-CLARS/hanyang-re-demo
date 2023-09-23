Liferay.namespace('PortletSharing');

Liferay.provide(
	Liferay.PortletSharing,
	'showNetvibesInfo',
	function(netvibesURL, basePortletURL) {
		var A = AUI();

		var portletURL = Liferay.PortletURL.createResourceURL();

		if (basePortletURL) {
			portletURL = Liferay.PortletURL.createURL(basePortletURL);
		}

		portletURL.setPortletId(133);

		portletURL.setParameter('netvibesURL', netvibesURL);

		var dialog = Liferay.Util.Window.getWindow(
			{
				dialog: {
					destroyOnHide: true
				},
				title: '\u004e\u0065\u0074\u0076\u0069\u0062\u0065\u0073\uc5d0\u0020\ucd94\uac00'
			}
		);

		dialog.plug(
			A.Plugin.IO,
			{
				uri: portletURL.toString()
			}
		);
	},
	['aui-io-plugin-deprecated', 'liferay-portlet-url', 'liferay-util-window']
);

Liferay.provide(
	Liferay.PortletSharing,
	'showWidgetInfo',
	function(widgetURL, basePortletURL) {
		var A = AUI();

		var portletURL = Liferay.PortletURL.createResourceURL();

		if (basePortletURL) {
			portletURL = Liferay.PortletURL.createURL(basePortletURL);
		}

		portletURL.setPortletId(133);

		portletURL.setParameter('widgetURL', widgetURL);

		var dialog = Liferay.Util.Window.getWindow(
			{
				dialog: {
					destroyOnHide: true
				},
				title: '\ubaa8\ub4e0\u0020\uc6f9\uc0ac\uc774\ud2b8\uc5d0\u0020\ucd94\uac00'
			}
		);

		dialog.plug(
			A.Plugin.IO,
			{
				uri: portletURL.toString()
			}
		);
	},
	['aui-io-plugin-deprecated', 'liferay-portlet-url', 'liferay-util-window']
);