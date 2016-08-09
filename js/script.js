(function(){

var site = {

  init : function() {
    
    this.loadPage(); 
    this.cacheDom();
    this.bindEvents();
    
  },
  cacheDom : function() {

    this.$basketTable = $('#cos-table');
    this.$url = $('.fake-url, .home-link');
    this.$item = $('.box');
    this.$continua = $('.continua-la-checkout');
    this.$cos = $('.cos-body').clone();
    this.livrareCos = $('.livrare-cos');
    this.cosTd = $('.livrare-cos tr td');
    this.codTr = $('.livrare-cos tr');
    this.afisor = $('.afisorComanda');

  },
  bindEvents : function() {

    var self = this;
    this.$url.on('click', {self: this}, this.pageLinks);
    this.$item.on('click', '.btnCart', {self: this}, this.addToCart);
    this.$basketTable.on('click','.remove', {self: this}, this.itemRemove);
    this.$basketTable.on('change','.quantity', {self: this}, this.calculateItemPrice);
    this.$basketTable.on('change','.quantity', {self: this}, this.calculateTotalPrice); 
    this.$continua.on('click', {self: this}, this.checkout);
    $(document).on('click', '.trimite-comanda', {self: this}, this.sendOrder);
    
  },
  loadPage : function() {

    var currentHash = window.location.hash.substr(1);

    currentHash = currentHash != '' && currentHash != null ? currentHash : 'acasa';

    var $page = $(".pagina."+currentHash);
  
    $('.pagina.active').removeClass('active');
    $("#navigation .selected").removeClass('selected');
    $page.addClass('active');

  },
  pageLinks : function(e) {

    var self = e.data.self;
    var url = $(this).attr("href");
    var hash = url.split('#')[1];
    var $activePage = $('.pagina.active');
    var $activeUrls = $("#navigation .selected");
    var $parent = $(this).parent();

    if (hash != null && hash != "" ) {
      var $page = $(".pagina."+hash);

      $activeUrls.removeClass('selected');
      $activePage.removeClass('active');
      $page.addClass('active');
      $parent.addClass('selected');
    }
  },
  addToCart : function(e) {

    var self = e.data.self;
    var details = $(this).parent().find('p').html();
    var title = $(this).parent().find('h3').html();
    var processedTitle = title.toLowerCase().trim().replace(/ /g,'-');
    var price = $(this).parent().find('span').html();
    var identify = $(this).parent().hasClass('details');
    var $itemInBasket = self.$basketTable.find('.item.'+processedTitle);

    if (identify) {
      var img = $(this).closest('li').find('.view a').clone().html();
    } else {
      var img = $(this).closest('li').find('.img-class').clone().html();
    }

    if($itemInBasket.length == 0) {

      var html = "";
      html += '<tr class="item '+processedTitle+'">';
        html += '<td>';
          html += '<div class="frame">'+ img + '</div>';
          html += '<span class="title">'+title+'</span>';
          html += '<p>'+details+'</p>';
        html += '</td>';
        html += '<td class="pretProdus">'+price+'</td>';
        html += '<td class="quant">';
          html += '<input type="number" min="0" value="1" class="quantity" />';
          html += '<a href="index.html#cos" class="remove">Remove</a>';
        html += '</td>';
        html += '<td class="totalProdus">'+price+'</td>';
      html += '</tr>';

      self.$basketTable.append(html);
    } else {
      
      var $quantityInput = $itemInBasket.find('.quantity');
      var currentQuantity = parseInt( $quantityInput.val() );
      
      $quantityInput.val(currentQuantity+1);

      var thisProd = $itemInBasket.find('.pretProdus').text().replace("lei","");
      thisProd = parseFloat(thisProd.trim());
      totalProdus = thisProd * (currentQuantity+1);
      $itemInBasket.find('.totalProdus').html(totalProdus + ' lei');

    }

    self=>calculateTotalPrice(self);

  },
  calculateItemPrice : function(e) {

    var self = e.data.self;
    var quant = $(this).val();
    var thisProd = $(this).parents().find('.pretProdus').text().replace("lei","");

    //$(this).parent().parent().find('.totalProdus').text('');
    quant = parseInt(quant);
    thisProd = parseFloat(thisProd.trim());
    totalProdus = thisProd * quant;
    $(this).parents().find('.totalProdus').html(totalProdus + ' lei');

  },
  calculateTotalPrice : function(e) {

    var self;
    if(e.data) {
      self = e.data;
    } else {
      self = e;
    }

    if(event) {
      event.preventDefault();
    }

    var total = 0;
    var $checkoutBtn = $(".continua-la-checkout");

    self.$basketTable.find('.totalProdus').each( function(){

      var pret = $(this).text().replace("lei","");
      var cantitate = $(this).prev().find('.quantity').val();

      cantitate = parseInt(cantitate);
      pret = parseFloat(pret.trim());
      total += pret;
    });

    if(total == 0) {
      $checkoutBtn.hide();
    } else {
      $checkoutBtn.show();
    }

    self.$basketTable.find('.totalPrice').html(total + ' lei');
  },
  itemRemove : function(e) {

    var self = e.data.self;
    var $item = $(this).parents('.item'); 

    if(confirm('Esti sigur ca vrei sa stergi acest produs din cos?')) {
      $item.remove();
      $self.calculateTotalPrice();
    }

    event.preventDefault();
  },
  checkout : function() {

    this.$cos.find('input.quantity').each(function() {
      var quantity = parseInt( $(this).val() );
      $(this).parents('.quant').html(quantity);
    });

    this.livrareCos.html(cos.html());

    this.cosTd.find('.frame').each(function() {
      $(this).removeClass('frame').addClass('frame2');
    });
    

    this.codTr.find('.quant').each(function() {
      $(this).parent().find('.pretProdus').before($(this));
    });

      var total = 0;
      var transport = 20;
      
      this.livrareCos.find('.totalProdus').each( function(){ //total sum
      var pret = $(this).text().replace("lei","");
      total += parseFloat(pret.trim());
      });

      this.afisor.find('.totalProd').html(total + ' lei'); //append total sum
      this.afisor.find('.transport').html('20' + ' lei');

      var totalProd = this.afisor.find('.totalProd').html();
      totalProd = parseFloat(totalProd);
      var pretFinal =  transport + totalProd;

      this.afisor.find('.totalCom').html(pretFinal + ' lei');
  },
  sendOrder: function() {

    var data = {};
    var $formular = $(".pagina.livrare");
    data.nume = $formular.find('input.nume').val();
    data.adresa = $formular.find('input.adresa').val();
    data.adresa2 = $formular.find('input.adresa2').val();
    data.oras = $formular.find('input.oras').val();
    data.judet = $formular.find('input.judet').val();
    data.email = $formular.find('input.email').val();
    data.telefon = $formular.find('input.telefon').val();
    data.card = $formular.find('input.card').val();
    data.numarCard = $formular.find('input.numar-card').val();
    data.numeCard = $formular.find('input.nume-card').val();
    data.dataCard = $formular.find('input.data-card').val();

    $compute = $formular.find('#compute').clone();
    $compute.find('img').remove();
    
    data.compute = $compute.html(); 

    var request = $.ajax({
      method: "POST",
      url: "/proceseaza-comanda.php",
      data: data
    });

    request.done(function () {

      alert('Comanda dumneavoastra a fost salvata.');

    });

    request.fail(function( jqXHR, textStatus ) {
      
      alert('Comanda dumneavoastra nu a fost salvata.');
    });

    event.preventDefault();
  }

}

site.init();

})();







