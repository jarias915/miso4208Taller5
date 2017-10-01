describe('Los estudiantes under monkeys', function() {
	it('visits los estudiantes and survives monkeys', function() {
		cy.visit('https://losestudiantes.co');
		cy.contains('Cerrar').click();
		cy.wait(1000);
		//randomClick(10);
		randomClickButton(10);
	})
})
function randomClick(monkeysLeft) {
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	};
	var monkeysLeft = monkeysLeft;
	if(monkeysLeft > 0) {
		cy.get('a').then($links => {
			var randomLink = $links.get(getRandomInt(0, $links.length));
			if(!Cypress.Dom.isHidden(randomLink)) {
				cy.wrap(randomLink).click({force: true});
				monkeysLeft = monkeysLeft - 1;
			}
			setTimeout(randomClick, 1000, monkeysLeft);
		});
	}
}

function randomClickButton(monkeysLeft) {
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	};
	var monkeysLeft = monkeysLeft;
	if(monkeysLeft > 0) {
		cy.get('button').then($buttons => {
			var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
			if(!Cypress.Dom.isHidden(randomButton)) {
				cy.wrap(randomButton).click({force: true});
				monkeysLeft = monkeysLeft - 1;
			}
			setTimeout(randomClickButton, 1000, monkeysLeft);
		});
	}
}
