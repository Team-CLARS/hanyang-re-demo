










AUI.add(
	'portal-available-languages',
	function(A) {
		var available = {};

		var direction = {};

		

			available['ko_KR'] = '??? (????)';
			direction['ko_KR'] = 'ltr';

		

			available['en_US'] = '?? (??)';
			direction['en_US'] = 'ltr';

		

			available['zh_CN'] = '??? (??)';
			direction['zh_CN'] = 'ltr';

		

		Liferay.Language.available = available;
		Liferay.Language.direction = direction;
	},
	'',
	{
		requires: ['liferay-language']
	}
);