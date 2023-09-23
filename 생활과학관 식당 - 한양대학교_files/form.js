AUI.add(
	'liferay-form',
	function(A) {
		var DEFAULTS_FORM_VALIDATOR = A.config.FormValidator;

		var defaultAcceptFiles = DEFAULTS_FORM_VALIDATOR.RULES.acceptFiles;

		var acceptFiles = function(val, node, ruleValue) {
			if (ruleValue == '*') {
				return true;
			}

			return defaultAcceptFiles(val, node, ruleValue);
		};

		var number = function(val, node, ruleValue) {
			var regex = /^[+\-]?(\d+)(\.\d+)?([eE][+-]?\d+)?$/;

			return regex && regex.test(val);
		};

		A.mix(
			DEFAULTS_FORM_VALIDATOR.RULES,
			{
				acceptFiles: acceptFiles,
				number: number
			},
			true
		);

		A.mix(
			DEFAULTS_FORM_VALIDATOR.STRINGS,
			{
				DEFAULT: '\uc774\u0020\ud544\ub4dc\ub97c\u0020\uc218\uc815\ud558\uc2ed\uc2dc\uc624\u002e',
				acceptFiles: '\uc720\ud6a8\ud55c\u0020\ud655\uc7a5\uc790\u0020\uac12\uc744\u0020\uc785\ub825\ud558\uc2ed\uc2dc\uc624\u0020\u0028\u007b\u0030\u007d\u0029\u002e',
				alpha: '\uc54c\ud30c\ubcb3\u0020\ubb38\uc790\ub9cc\u0020\uc785\ub825\ud558\uc2ed\uc2dc\uc624\u002e',
				alphanum: '\uc54c\ud30c\ubcb3\u0020\ubb38\uc790\u0020\ubc0f\u0020\uc22b\uc790\ub9cc\u0020\uc785\ub825\ud558\uc2ed\uc2dc\uc624\u002e',
				date: '\uc720\ud6a8\ud55c\u0020\ub0a0\uc9dc\ub97c\u0020\uc785\ub825\ud558\uc138\uc694\u002e',
				digits: '\uc22b\uc790\ub9cc\u0020\uc785\ub825\ud558\uc138\uc694\u002e',
				email: '\uc720\ud6a8\ud55c\u0020\uc774\uba54\uc77c\u0020\uc8fc\uc18c\ub97c\u0020\uc785\ub825\ud558\uc2ed\uc2dc\uc624\u002e',
				equalTo: '\ub3d9\uc77c\ud55c\u0020\uac12\uc744\u0020\ub2e4\uc2dc\u0020\uc785\ub825\ud558\uc138\uc694\u002e',
				max: '\u007b\u0030\u007d\u0020\ubcf4\ub2e4\u0020\uc791\uac70\ub098\u0020\uac19\uc740\u0020\uac12\uc744\u0020\uc785\ub825\ud558\uc138\uc694\u002e',
				maxLength: '\u007b\u0030\u007d\u0020\uac1c\u0020\uc774\uc0c1\uc758\u0020\ubb38\uc790\ub97c\u0020\uc785\ub825\ud558\uc5ec\u0020\uc8fc\uc2dc\uae30\u0020\ubc14\ub78d\ub2c8\ub2e4\u002e',
				min: '\u007b\u0030\u007d\u0020\ubcf4\ub2e4\u0020\ud06c\uac70\ub098\u0020\uac19\uc740\u0020\uac12\uc744\u0020\uc785\ub825\ud558\uc138\uc694\u002e',
				minLength: '\uc801\uc5b4\ub3c4\u0020\u007b\u0030\u007d\uae00\uc790\u0020\uc774\uc0c1\u0020\uc785\ub825\ud558\uc2ed\uc2dc\uc624\u002e',
				number: '\uc720\ud6a8\ud55c\u0020\ubc88\ud638\ub97c\u0020\uc785\ub825\ud558\uc2ed\uc2dc\uc624\u002e',
				range: '\u007b\u0030\u007d\uacfc\u0020\u007b\u0031\u007d\u0020\uc0ac\uc774\uc758\u0020\uac12\uc744\u0020\uc785\ub825\ud558\uc138\uc694\u002e',
				rangeLength: '\u007b\u0030\u007d\uacfc\u0020\u007b\u0031\u007d\u0020\ubb38\uc790\uc5f4\u0020\uc0ac\uc774\uc758\u0020\uac12\uc744\u0020\uc785\ub825\ud558\uc2ed\uc2dc\uc624\u002e',
				required: '\uc774\u0020\ud544\ub4dc\ub294\u0020\ud544\uc218\uc785\ub2c8\ub2e4\u002e',
				url: '\uc62c\ubc14\ub978\u0020\u0055\u0052\u004c\uc744\u0020\uc785\ub825\ud558\uc138\uc694\u002e'
			},
			true
		);

		var Form = A.Component.create(
			{
				ATTRS: {
					fieldRules: {
						setter: function(val) {
							var instance = this;

							instance._processFieldRules(val);

							return val;
						}
					},
					id: {},
					namespace: {},
					onSubmit: {
						valueFn: function() {
							var instance = this;

							return instance._onSubmit;
						}
					}
				},

				EXTENDS: A.Base,

				prototype: {
					initializer: function() {
						var instance = this;

						var id = instance.get('id');

						var form = document[id];
						var formNode = A.one(form);

						instance.form = form;
						instance.formNode = formNode;

						if (formNode) {
							var formValidator = new A.FormValidator(
								{
									boundingBox: formNode
								}
							);
							instance.formValidator = formValidator;

							instance._processFieldRules();

							instance._bindForm();
						}
					},

					_bindForm: function() {
						var instance = this;

						var formNode = instance.formNode;
						var formValidator = instance.formValidator;

						formValidator.on('submit', A.bind('_onValidatorSubmit', instance));

						formNode.delegate(['blur', 'focus'], A.bind('_onFieldFocusChange', instance), 'button,input,select,textarea');
					},

					_defaultSubmitFn: function(event) {
						var instance = this;

						if (!event.stopped) {
							submitForm(instance.form);
						}
					},

					_onFieldFocusChange: function(event) {
						var instance = this;

						var row = event.currentTarget.ancestor('.field');

						if (row) {
							row.toggleClass('field-focused', (event.type == 'focus'));
						}
					},

					_onSubmit: function(event) {
						var instance = this;

						event.preventDefault();

						setTimeout(
							function() {
								instance._defaultSubmitFn.call(instance, event);
							},
							0
						);
					},

					_onValidatorSubmit: function(event) {
						var instance = this;

						var onSubmit = instance.get('onSubmit');

						onSubmit.call(instance, event.validator.formEvent);
					},

					_processFieldRule: function(rules, strings, rule) {
						var instance = this;

						var value = true;

						var fieldName = rule.fieldName;
						var validatorName = rule.validatorName;

						if (rule.body && !rule.custom) {
							value = rule.body;
						}

						var fieldRules = rules[fieldName];

						if (!fieldRules) {
							fieldRules = {};

							rules[fieldName] = fieldRules;
						}

						fieldRules[validatorName] = value;

						if (rule.custom) {
							fieldRules.custom = rule.customValidatorRequired;

							DEFAULTS_FORM_VALIDATOR.RULES[validatorName] = rule.body;
						}

						var errorMessage = rule.errorMessage;

						if (errorMessage) {
							var fieldStrings = strings[fieldName];

							if (!fieldStrings) {
								fieldStrings = {};

								strings[fieldName] = fieldStrings;
							}

							fieldStrings[validatorName] = errorMessage;
						}
					},

					_processFieldRules: function(fieldRules) {
						var instance = this;

						if (!fieldRules) {
							fieldRules = instance.get('fieldRules');
						}

						var fieldStrings = {};
						var rules = {};

						for (var rule in fieldRules) {
							instance._processFieldRule(rules, fieldStrings, fieldRules[rule]);
						}

						var formValidator = instance.formValidator;

						if (formValidator) {
							formValidator.set('fieldStrings', fieldStrings);
							formValidator.set('rules', rules);
						}
					}
				},

				get: function(id) {
					var instance = this;

					return instance._INSTANCES[id];
				},

				register: function(config) {
					var instance = this;

					var form = new Liferay.Form(config);

					var formName = config.id || config.namespace;

					instance._INSTANCES[formName] = form;

					Liferay.fire(
						'form:registered',
						{
							form: form,
							formName: formName
						}
					);

					return form;
				},

				_INSTANCES: {}
			}
		);

		Liferay.Form = Form;
	},
	'',
	{
		requires: ['aui-base', 'aui-form-validator']
	}
);