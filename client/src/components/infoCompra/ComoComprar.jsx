import React from 'react';
import s from './ComoComprar.module.css';

function ComoComprar() {
  return (
    <div className={s.comoComprarContainer}> {/* Agrega una clase para el contenedor principal */}
      <h2 className={s.comoComprarTitle}>¿Cómo Comprar en Africa Mia Jeans?</h2>
      <br />
      <p className={s.comoComprarText}>Llena tu carrito de compras siguiendo estos pasos:</p>

      <ol className={s.comoComprarList}>
        <li>Selecciona los modelos y talles que deseas.</li>
        <li>Presiona el botón "AGREGAR AL CARRITO" para añadir los productos a tu carrito.</li>
        <li>Si deseas seguir comprando, presiona "SEGUIR COMPRANDO". Si no, presiona "FINALIZAR COMPRA".</li>
        <li>Para controlar que tengamos Stock Finaliza Compra por Whatsapp.</li>
        <li>Tanto el envío como el pago se coordinan a través de WhatsApp.</li>
        <li>El envío o la entrega de tu pedido se realiza una vez que se acredite el pago sin excepción.</li>
        <li>También puedes pagar en efectivo al retirar tu pedido en el local.</li>
      </ol>

      <h3 className={s.comoComprarSubtitle}>Información Importante</h3>
      <p className={s.comoComprarText}>Los precios de la tienda son por mayor y por curva (se pueden variar estampas y colores). La compra mínima para envíos es de $50.000 pesos.</p>

      <h2 className={s.comoComprarTitle}>Pagos</h2>
      <p className={s.comoComprarText}>Los pagos se coordinan a través de WhatsApp con la marca. Controlamos el stock de los productos de tu carrito y te contactamos para confirmar la disponibilidad.</p>

      <h3 className={s.comoComprarSubtitle}>Formas de Pago</h3>
      <ul className={s.comoComprarList}>
        <li>Transferencia o depósito bancario.</li>
        <li>Mercado Pago.</li>
        <li>Rapipago y Pago Fácil.</li>
        <li>Efectivo si retiras en nuestros locales.</li>
      </ul>

      <p className={s.comoComprarText}>Una vez acreditado el pago, procedemos con el envío de tu pedido.</p>

      <h2 className={s.comoComprarTitle}>Envíos</h2>
      <p className={s.comoComprarText}>Trabajamos con varias empresas de transporte de encomiendas, excepto Correo Argentino, OCA y Andreani. Algunas de las empresas con las que trabajamos incluyen Vía Cargo, Crucero Exprés, Eca Pack, Centra Argentino, Integral Pack, Expreso Demonte y más.</p>

      <h3 className={s.comoComprarSubtitle}>Preguntas Frecuentes</h3>
      <p className={s.comoComprarText}><span className={s.comoComprarHighlight}>¿Qué formas de pago hay?</span> Puedes pagar en efectivo (al retirar en el local), realizar transferencia o depósito bancario, utilizar Mercado Pago, Rapipago o Pago Fácil para envíos.</p>

      <p className={s.comoComprarText}><span className={s.comoComprarHighlight}>¿Cuál es el costo de envío?</span> El costo de envío corre por cuenta del comprador y se abona al retirar el paquete en la empresa de encomiendas. Los precios de envío dependen de la empresa y el peso del paquete.</p>

      <p className={s.comoComprarText}><span className={s.comoComprarHighlight}>¿Dónde puedo recibir mi pedido?</span> Realizamos envíos a todo el país, ya sea a la sucursal del expreso elegido o a domicilio.</p>

      <p className={s.comoComprarText}><span className={s.comoComprarHighlight}>¿Cuánto tarda en llegar el pedido?</span> El tiempo de entrega depende de la empresa de encomiendas. Debes ponerte en contacto con la empresa para obtener información sobre la fecha estimada de llegada.</p>

      <p className={s.comoComprarText}><span className={s.comoComprarHighlight}>¿Qué debo hacer si el producto no llega en buen estado?</span> Comunícate con nosotros a través de WhatsApp al 1130415773.</p>

      <h3 className={s.comoComprarSubtitle}>Política de Cambios</h3>
      <p className={s.comoComprarText}>Cuando recibas tu pedido, realiza una grabación al abrirlo y envía el video por WhatsApp en caso de cualquier problema. Los cambios solo se realizan por fallas y dentro de una semana desde la recepción del pedido, siempre que haya stock disponible del modelo.</p>

      <p className={s.comoComprarText}>Si tienes alguna pregunta, no dudes en contactarnos a través de WhatsApp al <a className={s.comoComprarLink} href="tel:1130415773">11 3041 5773</a>. ¡Gracias por confiar en Africa Mia Jeans!</p>
    </div>
  );
}

export default ComoComprar;
