$(document).ready(function () {

	$('.header__btn').on('click', function () {
		$('.overlay').show();
	});

	$('.close').on('click', function () {
		$('.overlay').hide();

	});
});