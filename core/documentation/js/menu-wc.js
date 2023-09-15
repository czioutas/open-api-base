'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">openapibase documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-fbe789b09260f4135a650184f109bed12f8e5e7ba29af565e640c6fe78422b2826a516469ab09ab105d6cabcebe3284f66658e6011e6108bd4dc6c726b2514e3"' : 'data-bs-target="#xs-controllers-links-module-AppModule-fbe789b09260f4135a650184f109bed12f8e5e7ba29af565e640c6fe78422b2826a516469ab09ab105d6cabcebe3284f66658e6011e6108bd4dc6c726b2514e3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-fbe789b09260f4135a650184f109bed12f8e5e7ba29af565e640c6fe78422b2826a516469ab09ab105d6cabcebe3284f66658e6011e6108bd4dc6c726b2514e3"' :
                                            'id="xs-controllers-links-module-AppModule-fbe789b09260f4135a650184f109bed12f8e5e7ba29af565e640c6fe78422b2826a516469ab09ab105d6cabcebe3284f66658e6011e6108bd4dc6c726b2514e3"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-ad566527ad5cb0533eddae2ac374457511a02e0229156b3aadeb6cb4a872a89e58e96b72e300e246f07a78ecc9c1d9c13bb94c089fce3165642b60d9045f0aa6"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-ad566527ad5cb0533eddae2ac374457511a02e0229156b3aadeb6cb4a872a89e58e96b72e300e246f07a78ecc9c1d9c13bb94c089fce3165642b60d9045f0aa6"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-ad566527ad5cb0533eddae2ac374457511a02e0229156b3aadeb6cb4a872a89e58e96b72e300e246f07a78ecc9c1d9c13bb94c089fce3165642b60d9045f0aa6"' :
                                            'id="xs-controllers-links-module-AuthModule-ad566527ad5cb0533eddae2ac374457511a02e0229156b3aadeb6cb4a872a89e58e96b72e300e246f07a78ecc9c1d9c13bb94c089fce3165642b60d9045f0aa6"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-ad566527ad5cb0533eddae2ac374457511a02e0229156b3aadeb6cb4a872a89e58e96b72e300e246f07a78ecc9c1d9c13bb94c089fce3165642b60d9045f0aa6"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-ad566527ad5cb0533eddae2ac374457511a02e0229156b3aadeb6cb4a872a89e58e96b72e300e246f07a78ecc9c1d9c13bb94c089fce3165642b60d9045f0aa6"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-ad566527ad5cb0533eddae2ac374457511a02e0229156b3aadeb6cb4a872a89e58e96b72e300e246f07a78ecc9c1d9c13bb94c089fce3165642b60d9045f0aa6"' :
                                        'id="xs-injectables-links-module-AuthModule-ad566527ad5cb0533eddae2ac374457511a02e0229156b3aadeb6cb4a872a89e58e96b72e300e246f07a78ecc9c1d9c13bb94c089fce3165642b60d9045f0aa6"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtMagicLinkStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtMagicLinkStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtRefreshStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtRefreshStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CommunicationModule.html" data-type="entity-link" >CommunicationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CommunicationModule-a13e0ddbe145df8321e6435d9562c2a385d93075175b5e96ac2099e4dbb0c1c189b0c3b42ebd81b4c21e9d1d1a197f7819b3422d42cc82407bdba02503fa4ac4"' : 'data-bs-target="#xs-injectables-links-module-CommunicationModule-a13e0ddbe145df8321e6435d9562c2a385d93075175b5e96ac2099e4dbb0c1c189b0c3b42ebd81b4c21e9d1d1a197f7819b3422d42cc82407bdba02503fa4ac4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CommunicationModule-a13e0ddbe145df8321e6435d9562c2a385d93075175b5e96ac2099e4dbb0c1c189b0c3b42ebd81b4c21e9d1d1a197f7819b3422d42cc82407bdba02503fa4ac4"' :
                                        'id="xs-injectables-links-module-CommunicationModule-a13e0ddbe145df8321e6435d9562c2a385d93075175b5e96ac2099e4dbb0c1c189b0c3b42ebd81b4c21e9d1d1a197f7819b3422d42cc82407bdba02503fa4ac4"' }>
                                        <li class="link">
                                            <a href="injectables/EmailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EmailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HealthModule.html" data-type="entity-link" >HealthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-HealthModule-59f113e3526497ed80e902f6b5f5cb2ce74722ab84c3096413477c678d37516c2b1bba8f95658f985f96c138c27a9fb2d6c369bada81af20b890e42ded5a1a53"' : 'data-bs-target="#xs-controllers-links-module-HealthModule-59f113e3526497ed80e902f6b5f5cb2ce74722ab84c3096413477c678d37516c2b1bba8f95658f985f96c138c27a9fb2d6c369bada81af20b890e42ded5a1a53"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-HealthModule-59f113e3526497ed80e902f6b5f5cb2ce74722ab84c3096413477c678d37516c2b1bba8f95658f985f96c138c27a9fb2d6c369bada81af20b890e42ded5a1a53"' :
                                            'id="xs-controllers-links-module-HealthModule-59f113e3526497ed80e902f6b5f5cb2ce74722ab84c3096413477c678d37516c2b1bba8f95658f985f96c138c27a9fb2d6c369bada81af20b890e42ded5a1a53"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UserModule-8899e1d7ac4380e21eae3fea28a8eca83a818bedae0561cd536129ba0fe356156a9b6de8dc86ab9412ca680135193e6a97cbbf123aedaafb32cce0eb7c8fc946"' : 'data-bs-target="#xs-injectables-links-module-UserModule-8899e1d7ac4380e21eae3fea28a8eca83a818bedae0561cd536129ba0fe356156a9b6de8dc86ab9412ca680135193e6a97cbbf123aedaafb32cce0eb7c8fc946"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-8899e1d7ac4380e21eae3fea28a8eca83a818bedae0561cd536129ba0fe356156a9b6de8dc86ab9412ca680135193e6a97cbbf123aedaafb32cce0eb7c8fc946"' :
                                        'id="xs-injectables-links-module-UserModule-8899e1d7ac4380e21eae3fea28a8eca83a818bedae0561cd536129ba0fe356156a9b6de8dc86ab9412ca680135193e6a97cbbf123aedaafb32cce0eb7c8fc946"' }>
                                        <li class="link">
                                            <a href="injectables/UserProfile.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfile</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserRepository.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRepository</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/UserEntity.html" data-type="entity-link" >UserEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AllExceptionsFilter.html" data-type="entity-link" >AllExceptionsFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthenticatedUserDto.html" data-type="entity-link" >AuthenticatedUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthSuccessDto.html" data-type="entity-link" >AuthSuccessDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatabaseLogger.html" data-type="entity-link" >DatabaseLogger</a>
                            </li>
                            <li class="link">
                                <a href="classes/LocalUserDto.html" data-type="entity-link" >LocalUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshTokenPayload.html" data-type="entity-link" >RefreshTokenPayload</a>
                            </li>
                            <li class="link">
                                <a href="classes/RefreshUserDto.html" data-type="entity-link" >RefreshUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RequestMagicLinkDto.html" data-type="entity-link" >RequestMagicLinkDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Somename1693507040444.html" data-type="entity-link" >Somename1693507040444</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenPayloadDto.html" data-type="entity-link" >TokenPayloadDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserDto.html" data-type="entity-link" >UserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppLoggerMiddleware.html" data-type="entity-link" >AppLoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthProfile.html" data-type="entity-link" >AuthProfile</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EmailService.html" data-type="entity-link" >EmailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtMagicLinkGuard.html" data-type="entity-link" >JwtMagicLinkGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtMagicLinkStrategy.html" data-type="entity-link" >JwtMagicLinkStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshGuard.html" data-type="entity-link" >JwtRefreshGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtRefreshStrategy.html" data-type="entity-link" >JwtRefreshStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserProfile.html" data-type="entity-link" >UserProfile</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserRepository.html" data-type="entity-link" >UserRepository</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppRuntimeConfig.html" data-type="entity-link" >AppRuntimeConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JwtConfig.html" data-type="entity-link" >JwtConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PgsqlDbConfig.html" data-type="entity-link" >PgsqlDbConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SendGridConfig.html" data-type="entity-link" >SendGridConfig</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});