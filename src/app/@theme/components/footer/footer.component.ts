import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by"><a href="http://plugandplaytechcenter.com/" target="_blank">Plug and Play Tech Center</a> © 2018</span>
    <div class="socials">
      <!-- <a href="#" target="_blank" class="ion ion-social-github"></a> -->
      <a href="https://www.facebook.com/plugandplaytechcenter/" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/PlugandPlayTC" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/company/plug-and-play-tech-center/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
