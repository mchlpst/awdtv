import type { Schema, Attribute } from '@strapi/strapi';

export interface ElementsFooterColumn extends Schema.Component {
  collectionName: 'components_elements_footer_columns';
  info: {
    displayName: 'Footer Column';
  };
  attributes: {
    Title: Attribute.String;
    Text: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'standard';
        }
      >;
    Links: Attribute.Component<'elements.link', true>;
  };
}

export interface ElementsLink extends Schema.Component {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
    icon: 'link';
    description: '';
  };
  attributes: {
    article: Attribute.Relation<
      'elements.link',
      'oneToOne',
      'api::article.article'
    >;
    page: Attribute.Relation<'elements.link', 'oneToOne', 'api::page.page'>;
    LinkLabel: Attribute.String;
    Url: Attribute.String;
  };
}

export interface ElementsPlayer extends Schema.Component {
  collectionName: 'components_elements_players';
  info: {
    displayName: 'Player';
    icon: 'shirt';
  };
  attributes: {
    FirstName: Attribute.String;
    LastName: Attribute.String;
    Number: Attribute.Integer;
    Photo: Attribute.Media;
  };
}

export interface ElementsStaff extends Schema.Component {
  collectionName: 'components_elements_staff';
  info: {
    displayName: 'Staff';
    description: '';
  };
  attributes: {
    FirstName: Attribute.String;
    LastName: Attribute.String;
    Photo: Attribute.Media;
    Function: Attribute.String;
  };
}

export interface PageComponentsFooterColumn extends Schema.Component {
  collectionName: 'components_page_components_footer_columns';
  info: {
    displayName: 'Footer Column';
  };
  attributes: {
    Title: Attribute.String;
    Text: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'standard';
        }
      >;
    Links: Attribute.Component<'elements.link', true> &
      Attribute.SetMinMax<{
        max: 5;
      }>;
  };
}

export interface PageComponentsGridImages extends Schema.Component {
  collectionName: 'components_page_components_grid_images';
  info: {
    displayName: 'Grid images';
    icon: 'grid';
    description: '';
  };
  attributes: {
    MainBlockTitle: Attribute.String;
    MainBlockImage: Attribute.Media;
    SecondairBlockTitle: Attribute.String;
    SecondairBlockImage: Attribute.Media;
    TetiairBlockImage: Attribute.Media;
    MainLink: Attribute.Component<'elements.link'>;
    SecondairLink: Attribute.Component<'elements.link'>;
  };
}

export interface PageComponentsInstagramBlock extends Schema.Component {
  collectionName: 'components_page_components_instagram_blocks';
  info: {
    displayName: 'Instagram Block';
    icon: 'manyWays';
    description: '';
  };
  attributes: {
    Layout: Attribute.Enumeration<['Table', 'Slider']> & Attribute.Required;
  };
}

export interface PageComponentsTeamOverviewCard extends Schema.Component {
  collectionName: 'components_page_components_team_overview_cards';
  info: {
    displayName: 'Team Overview Card';
    icon: 'grid';
  };
  attributes: {
    teamName: Attribute.String;
    TeamPhoto: Attribute.Media;
  };
}

export interface PageComponentsTrainingSchemeBlock extends Schema.Component {
  collectionName: 'components_page_components_training_scheme_blocks';
  info: {
    displayName: 'Training Scheme Block';
    icon: 'clock';
    description: '';
  };
  attributes: {
    SchemeType: Attribute.Enumeration<['Zaal', 'Veld']>;
    Content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'elements.footer-column': ElementsFooterColumn;
      'elements.link': ElementsLink;
      'elements.player': ElementsPlayer;
      'elements.staff': ElementsStaff;
      'page-components.footer-column': PageComponentsFooterColumn;
      'page-components.grid-images': PageComponentsGridImages;
      'page-components.instagram-block': PageComponentsInstagramBlock;
      'page-components.team-overview-card': PageComponentsTeamOverviewCard;
      'page-components.training-scheme-block': PageComponentsTrainingSchemeBlock;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}
