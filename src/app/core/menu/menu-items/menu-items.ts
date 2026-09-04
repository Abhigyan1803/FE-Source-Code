import { Injectable } from '@angular/core';
import { Routings } from 'app/Shared/constant';

export interface ChildrenItems {
  state?: string;
  name?: string;
  type?: string;
}

export interface Menu {
  state?: string;
  name?: string;
  type?: string;
  icon?: string;
  children?: ChildrenItems[];
}

/**
 * 	MODULES I'Ds AND SUBMODULES I'Ds ARE COMING FROM BACKEND
 */


const AdminMenus = [
  {
    state: 'main/admin/dashboard',
    name: 'Dashboard',
    type: 'link',
    // icon: ''
  },
  {
    state: 'main/admin/user-access',
    name: 'User Access',
    type: 'sub',
    children: [
      { state: 'manage-role', name: 'Manage Role', type: 'link' },
      { state: 'manage-staff', name: 'Manage Staff', type: 'link' },
      { state: 'manage-admin', name: 'Manage Admin', type: 'link' },

    ]
  },



  {
    state: 'main/admin/home',
    name: 'Home',
    type: 'sub',
    // icon: 'map',
    children: [
      { state: 'events', name: 'Upcoming Events', type: 'link' },
      // { state: 'special-occasions', name: 'Social List', type: 'link' },
      { state: 'programes', name: 'Comdt. Daily PGME', type: 'link' },
      { state: 'messages', name: 'Comdt. Message', type: 'link' },
      { state: 'activity', name: 'IMA Activities', type: 'link' },
      { state: 'greybook', name: 'Greybook', type: 'link' },
      { state: 'central-library-management', name: 'Central Library', type: 'link' },
      { state: 'ebook', name: 'E-Book', type: 'link' },
      { state: 'cyber-policy', name: 'Cyber Policy', type: 'link' },
      { state: 'book-list', name: 'IMA Recommended Reading List', type: 'link' },
      { state: 'announcement', name: 'Announcements', type: 'link' },
      // { state: 'social-list', name: 'Social List', type: 'link' },
      { state: 'section-hospital', name: 'Section Hospital', type: 'link' },
      { state: 'gc-msg', name: 'OC Message Board', type: 'link' },

      {
        state: 'hall-of-fame', name: 'Hall of Fame', type: 'sub', children: [
          { state: 'gallantry-awardees', name: 'Gallantry Awardees', type: 'link' },
        ]
      },
      { state: 'ima-blog', name: 'IMA Blog', type: 'link' },

    ]
  },

  {
    state: 'main/admin/trg-team',
    name: 'TRG Team',
    type: 'sub',
    // icon: 'map',
    children: [
      { state: 'members', name: 'Members', type: 'link' },

      // {
      //   state: '', name: 'Weapons Training', type: 'sub',
      //   children: [
      //     { state: 'add-exam-param', name: 'Add Exam Parameter', type: 'link' },
      //     { state: Routings.addWeaponsPath, name: 'Add Weapon', type: 'link' },
      //     { state: 'weapons/1', name: 'Weapons Term I', type: 'link' },
      //     { state: 'weapons/2', name: 'Weapons Term II', type: 'link' },
      //     { state: 'weapons/3', name: 'Weapons Term III', type: 'link' },

      //   ]
      // },

      // { state: Routings.addWeaponsPath, name: 'Add Weapon', type: 'link' },

      // { state: 'weapons/1', name: 'Weapons Term I', type: 'link' },
      // { state: 'weapons/2', name: 'Weapons Term II', type: 'link' },
      // { state: 'weapons/3', name: 'Weapons Term III', type: 'link' },
      // {
      //   state: 'gso-1-training',
      //   name: 'GSO-1 Training',
      //   type: 'sub',
      //   children: [
      //     { state: 'sop', type: 'link', name: 'SOPs' },
      //     { state: 'schedule-of-exercises', type: 'link', name: 'Schedule of Exercises' },
      //   ]
      //   // icon: ''
      // },

      // {
      //   state: 'gso-2-training',
      //   name: 'GSO-2 Training',
      //   type: 'link',
      //   // icon: ''
      // },
      // {
      //   state: 'gso-2-pgme',
      //   name: 'GSO-2 (PGME)',
      //   type: 'sub',
      //   // icon: 'show_chart',
      //   children: [
      //     { state: 'season-terms', name: 'Season Terms', type: 'link' },

      //     //TRG Calendar
      //     {
      //       state: 'trg-calendar', type: 'sub', name: 'TRG Calendar', children: [
      //         // { state: 'daily-programs', type: 'link', name: 'Daily PGME' },
      //         { state: 'weekly-programs', type: 'link', name: 'Daily & Weekly PGME' },
      //         { state: 'forecast', type: 'link', name: 'Forecast of TRG Events' },
      //       ]
      //     },

      //     //Syllabus
      //     {
      //       state: 'syllabus', type: 'sub', name: 'Syllabus', children: [
      //         // { state: 'terms', type: 'link', name: 'Syllabus Termwise' },
      //         { state: 'soldierly', type: 'link', name: 'Soldierly' },
      //         { state: 'scholarly', type: 'link', name: 'Scholarly' },
      //         { state: 'gentlemanly', type: 'link', name: 'Gentlemanly' },
      //         { state: 'leaderly', type: 'link', name: 'Leaderly' },
      //       ]
      //     },
      //   ]
      // },
      // {
      //   state: 'gso-2-assessment',
      //   name: 'GSO-2 (ASSESSMENT)',
      //   type: 'sub',
      //   // icon: 'show_chart',
      //   children: [
      //     // { state: 'service-subjects/datesheet', type: 'link', name: 'Datesheet' },
      //     {
      //       state: 'service-subjects', type: 'sub', name: 'Service Subjects', children: [
      //         { state: 'datesheet', type: 'link', name: 'Datesheet' },
      //       ]
      //     },
      //   ]
      // },
      // {
      //   state: 'adventure-cell',
      //   name: 'Adventure Cell',
      //   type: 'sub',
      //   // icon: 'show_chart',
      //   children: [
      //     { state: 'general-instruction', type: 'link', name: 'General Instructions' },
      //     { state: 'letters', type: 'link', name: 'Letters' },
      //     { state: 'transport', type: 'link', name: 'Transport Demand' },
      //     { state: 'sops', type: 'link', name: 'SOPs' },
      //     { state: 'nominal', type: 'link', name: 'Nominal Role' },
      //     { state: 'chart', type: 'link', name: 'Charts' },
      //     { state: 'report', type: 'link', name: 'Reports' },
      //   ]
      // },
      // {
      //   state: 'weapon/training',
      //   name: 'Weapon Training',
      //   type: 'link',
      // },

      // {
      //   state: 'pt',
      //   name: 'PT',
      //   type: 'link',
      //   // icon: ''
      // },

      // {
      //   state: 'eqtn',
      //   name: 'EQTN',
      //   type: 'link',
      //   // icon: ''
      // },
    ]
  },

  { state: 'main/admin/trg-battalion/gc-database', name: 'OC Database', type: 'link' },
  {
    state: 'main/admin/gc-term',
    name: 'OC Term Update',
    type: 'link',
  },
  { state: 'main/admin/record', name: 'Record of Service', type: 'link' },

  {
    state: 'main/admin/trg-battalion',
    name: 'TRG Battalion',
    type: 'sub',
    // icon: 'map',
    children: [
      { state: 'members', name: 'Members', type: 'link' },
      // { state: 'gc-database', name: 'OC Database', type: 'link' },
      { state: 'history', name: 'History of Battalion', type: 'link' },
      { state: 'gallantry', name: 'Gallantry Awardees', type: 'link' },
      { state: 'performance', name: 'Performance Highlights', type: 'link' },
      // { state: 'gc-activities', name: 'OC Activities', type: 'link' },
      // { state: 'bro', name: 'BRO', type: 'link' },
      // { state: 'bdo', name: 'BDO', type: 'link' },
      // { state: 'assignment-of-duties', name: 'Assignments of Duties', type: 'link' },
      // { state: 'parade-state', name: 'Parade State of GCs', type: 'link' },
      // { state: 'location-state', name: 'Location State of Officers', type: 'link' },
      { state: 'oq-subject', name: 'OQ Marks Subject', type: 'link' },
      { state: 'camp-subject', name: 'Camp Subject', type: 'link' },

      { state: 'exercise-type', name: 'Exercise-type', type: 'link' },

    ]
  },
  // {
  //   state: 'main/admin/Adjutant-Branch-Management',
  //   name: 'Adjutant Branch',
  //   type: 'sub',
  //   // icon: 'map',
  //   children: [
  //     { state: 'adjutant-order', name: 'Adjutant Order', type: 'link' },
  //     { state: 'aro', name: 'ARO', type: 'link' },
  //     { state: 'drill-competition', name: 'Drill Subject', type: 'link' },



  //   ]
  // },
  {
    state: 'main/admin/GS-Branch',
    name: 'GS Branch',
    type: 'sub',
    // icon: 'map',
    children: [
      { state: 'members', name: 'Members', type: 'link' },


      // { state: 'coord', name: 'Coord', type: 'link' },
      {
        state: 'stats',
        name: 'Stats',
        type: 'sub',
        // icon: 'map',
        children: [

          { state: 'academy-parade-state', name: 'Academy Parade State', type: 'link' },
          {
            state: 'guidelines', type: 'sub', name: 'Imp Policy Guidelines', children: [

              { state: 'administrative-instructions', name: 'Administrative Instructions', type: 'link' },
              { state: 'standing-trg-directives', name: 'Standing TRG Directives', type: 'link' },
              { state: 'fgc-policy', name: 'FGC Policy', type: 'link' },
              { state: 'pcab-coa', name: 'PCAB & COA', type: 'link' },
              { state: 'misc', name: 'Misc', type: 'link' },

            ]
          },


          {
            state: 'current-cases', type: 'sub', name: 'Current Cases', children: [
              { state: 'relegation', name: 'Relegation', type: 'link' },
              { state: 'resignation', name: 'Resignation', type: 'link' },
              { state: 'court-cases', name: 'Court Cases', type: 'link' },
              { state: 'withdrawal', name: 'Withdrawal', type: 'link' },

            ]
          },


          {
            state: 'assessment', type: 'sub', name: 'Assessment', children: [

              { state: 'schedule', name: 'Schedule', type: 'link' },
              { state: 'matrix', name: 'Matrix', type: 'link' },
            ]
          },

          {
            state: 'document-checkboard', type: 'sub', name: 'Document Checkboard', children: [
              { state: 'pending-cvr-cases', name: 'Pending CVR cases', type: 'link' },
              { state: 'pending-education-docs', name: 'Pending Education Docs', type: 'link' },
              { state: 'pending-confirmation', name: 'Pending Confirmation from Line Directorate', type: 'link' },
              { state: 'pc-list', name: 'PC List', type: 'link' },
              { state: 'aviation-list', name: 'Aviation List', type: 'link' },
              { state: 'para-list', name: 'Para List', type: 'link' },
              { state: '61-cav-list', name: '61 Cav List', type: 'link' },
            ]
          },

          {
            state: 'stats', type: 'sub', name: 'Stats', children: [
              { state: 'intake', name: 'Intake', type: 'link' },
              { state: 'poc', name: 'POC', type: 'link' },
            ]
          },

        ]
      },

      {
        state: 'security',
        name: 'Security',
        type: 'sub',
        // icon: '',
        children: [
          { state: 'territorial', name: 'Territorial Army', type: 'link' },
          { state: 'dsc', name: 'DSC', type: 'link' },
          { state: 'rp', name: 'RP Sec', type: 'link' },
          { state: 'demo', name: 'Demo Coy', type: 'link' },
          {
            state: 'apparatus', name: 'Security Apparatus', type: 'sub', children: [
              { state: 'sre', name: 'SRE', type: 'link' },
              { state: 'acs', name: 'ACS FP', type: 'link' },
              { state: 'other-security', name: 'Other Security Infra', type: 'link' },
              { state: 'communication-infra', name: 'Communication Infra', type: 'link' },
            ]
          },
          { state: 'policies', name: 'Policies/Imp Letters/Advisories', type: 'link' },
          {
            state: 'access-control', name: 'Access Control', type: 'sub', children: [
              { state: 'biometric-rfid', name: 'Biometric RFID Card', type: 'link' },
              { state: 'vehicle-sticker', name: 'Vehicle StickersACS FP', type: 'link' },
              {
                state: 'entry-passes', name: 'Entry Passes', type: 'sub', children: [
                  { state: 'combat', name: 'Combat', type: 'link' },
                  { state: 'civ', name: 'Def / Civ staff', type: 'link' },
                  { state: 'casual', name: 'Casual staff', type: 'link' },
                ]
              }
            ]
          },
          {
            state: 'info-security', name: 'Info Security', type: 'sub', children: [
              { state: 'policies', name: 'Policies / Advisories', type: 'link' },
              { state: 'return', name: 'Reports / Returns', type: 'link' },
            ]
          },
          {
            state: 'prophylactic', name: 'Prophylactic Security', type: 'sub', children: [
              { state: 'prophylactic-policies', name: 'Policies / Advisories', type: 'link' },
              { state: 'prophylactic-reports', name: 'Reports / Returns', type: 'link' },
            ]
          },
          {
            state: 'intelligence', name: 'Intelligence', type: 'sub', children: [
              { state: 'intelligence-policies', name: 'Policies / Advisories', type: 'link' },
              { state: 'intelligence-reports', name: 'Reports / Returns', type: 'link' },
            ]
          },
        ]
      },

      {
        state: 'itcommunication',
        name: 'IT & Communication',
        type: 'sub',
        // icon: '',
        children: [
          {
            state: 'charter', name: 'Charter', type: 'sub', children: [
              { state: 'it-sec', name: 'IT Sec', type: 'link' },
              { state: 'communication-sec', name: 'Communication Sec', type: 'link' },
            ]
          },
          { state: 'itppp', name: 'IT PPP', type: 'link' },
          // {
          //   state: 'complaints', name: 'Complaints / Requirements', type: 'link',
          // },
          {
            state: 'complaints-requirements', name: 'Complaints / Requirements', type: 'sub', children: [
              { state: 'it', name: 'IT', type: 'link' },
              { state: 'communication', name: 'Communication', type: 'link' },
            ]
          },

        ]
      },
    ]
  },
  {
    state: 'main/admin/it',
    name: 'Complaints/Requirement',
    type: 'link',
    // icon: ''
  },
  // {
  //   id: 5,
  //   state: 'main/trg-team/weapon/training',
  //   name: 'Weapon Training',
  //   type: 'sub',
  //   children: [
  //     {
  //       state: 'I Term', type: 'link', name: 'I Term',
  //     },
  //     {
  //       state: 'II Term', type: 'link', name: 'II Term',
  //     },
  //     {
  //       state: 'II Tech', type: 'link', name: 'II Tech',
  //     },
  //     {
  //       state: 'III Term', type: 'link', name: 'III Term',
  //     },

  //   ]
  // }
]

const TRG_TEAM_MENU = [
  {
    id: 'common',
    state: 'main/trg-team/dashboard',
    name: 'DASHBOARD',
    type: 'link',
    // icon: ''
  },
  {
    id: 1,
    state: 'main/trg-team/gso-1-training',
    name: 'GSO-1 Training',
    type: 'sub',
    children: [
      { state: 'sop', type: 'link', name: 'SOPs' },
      { state: 'schedule-of-exercises', type: 'link', name: 'Schedule of Exercises' },
      { state: 'schedule-of-central-lec', type: 'link', name: 'Schedule of central lec' },

    ]
    // icon: ''
  },
  // {
  //   state: 'main/trg-team/gso-2-training',
  //   name: 'GSO-2 Training',
  //   type: 'link',
  //   icon: ''
  // },
  {
    id: 2,
    state: 'main/trg-team/gso-2-pgme',
    name: 'GSO-2 (PGME)',
    type: 'sub',
    // icon: 'show_chart',
    children: [
      //TRG Calendar
      { state: 'season-terms', name: 'Season Terms', type: 'link' },

      {
        state: 'trg-calendar', type: 'sub', name: 'TRG Calendar', children: [
          // { state: 'daily-programs', type: 'link', name: 'Daily PGME' },
          { state: 'weekly-programs', type: 'link', name: 'Daily & Weekly PGME' },
          { state: 'forecast', type: 'link', name: 'Forecast of TRG Events' },
        ]
      },

      //Syllabus
      {
        state: 'I Term', type: 'sub', name: 'I Term', children: [

          {
            state: 'syllabus', type: 'sub', name: 'Syllabus', children: [
              // { state: 'terms', type: 'link', name: 'Syllabus Termwise' },
              { state: 'BMT-1', type: 'link', name: 'BMT-1', },
              {
                state: 'BMT-2', type: 'sub', name: 'BMT-2', children: [
                  { state: 'Map Reading', type: 'link', name: 'Map Reading' },
                  { state: 'Radio Telephony', type: 'link', name: 'Radio Telephony' },
                  { state: 'Field Engineering', type: 'link', name: 'Field Engineering' },
                  { state: 'OnA and InS', type: 'link', name: 'O&A and I&S' },
                  { state: 'Financial Management', type: 'link', name: 'Financial Management' },
                  { state: 'Leadership Trg', type: 'link', name: 'Leadership Trg' },
                ]
              },
              { state: 'soldierly', type: 'link', name: 'Soldierly' },
              { state: 'scholarly', type: 'link', name: 'Scholarly' },
              { state: 'gentlemanly', type: 'link', name: 'Gentlemanly' },
              { state: 'leaderly', type: 'link', name: 'Leaderly' },

            ]
          },
          //Study Material
          {
            state: 'study-material', type: 'sub', name: 'Study Material',
            children: [
              { state: 'material/BMT-1', type: 'link', name: 'BMT-1', },

              {
                state: 'BMT-2', type: 'sub', name: 'BMT-2', children: [
                  { state: 'Map Reading', type: 'link', name: 'Map Reading' },
                  { state: 'Radio Telephony', type: 'link', name: 'Radio Telephony' },
                  { state: 'Field Engineering', type: 'link', name: 'Field Engineering' },
                  { state: 'OnA and InS', type: 'link', name: 'O&A and I&S' },
                  { state: 'Financial Management', type: 'link', name: 'Financial Management' },
                  { state: 'Leadership Trg', type: 'link', name: 'Leadership Trg' },
                ]
              },
              { state: 'material/Soldierly', type: 'link', name: 'Soldierly', },
              { state: 'material/Scholarly', type: 'link', name: 'Scholarly', },
              { state: 'material/Leaderly', type: 'link', name: 'Leaderly', },
              { state: 'material/Gentlemanly', type: 'link', name: 'Gentlemanly', },

            ]
          },

        ]
      },
      {
        state: 'II Term', type: 'sub', name: 'II Term', children: [

          {
            state: 'syllabus', type: 'sub', name: 'Syllabus', children: [
              // { state: 'terms', type: 'link', name: 'Syllabus Termwise' },
              { state: 'BMT-1', type: 'link', name: 'BMT-1', },
              {
                state: 'BMT-2', type: 'sub', name: 'BMT-2', children: [
                  { state: 'Map Reading', type: 'link', name: 'Map Reading' },
                  { state: 'Radio Telephony', type: 'link', name: 'Radio Telephony' },
                  { state: 'Field Engineering', type: 'link', name: 'Field Engineering' },
                  { state: 'OnA and InS', type: 'link', name: 'O&A and I&S' },
                  { state: 'Financial Management', type: 'link', name: 'Financial Management' },
                  { state: 'Leadership Trg', type: 'link', name: 'Leadership Trg' },
                ]
              },
              { state: 'soldierly', type: 'link', name: 'Soldierly' },
              { state: 'scholarly', type: 'link', name: 'Scholarly' },
              { state: 'gentlemanly', type: 'link', name: 'Gentlemanly' },
              { state: 'leaderly', type: 'link', name: 'Leaderly' },

            ]
          },
          //Study Material
          {
            state: 'study-material', type: 'sub', name: 'Study Material',
            children: [
              // { state: 'material/Bmt1', type: 'link', name: 'BMT-1', },
              //change state from Bmt1 to BMT-1
              { state: 'material/BMT-1', type: 'link', name: 'BMT-1', },

              {
                state: 'BMT-2', type: 'sub', name: 'BMT-2', children: [
                  { state: 'Map Reading', type: 'link', name: 'Map Reading' },
                  { state: 'Radio Telephony', type: 'link', name: 'Radio Telephony' },
                  { state: 'Field Engineering', type: 'link', name: 'Field Engineering' },
                  { state: 'OnA and InS', type: 'link', name: 'O&A and I&S' },
                  { state: 'Financial Management', type: 'link', name: 'Financial Management' },
                  { state: 'Leadership Trg', type: 'link', name: 'Leadership Trg' },
                ]
              },
              { state: 'material/Soldierly', type: 'link', name: 'Soldierly', },
              { state: 'material/Scholarly', type: 'link', name: 'Scholarly', },
              { state: 'material/Leaderly', type: 'link', name: 'Leaderly', },
              { state: 'material/Gentlemanly', type: 'link', name: 'Gentlemanly', },

            ]
          },

        ]
      },
      {
        state: 'II Tech', type: 'sub', name: 'II Tech', children: [

          {
            state: 'syllabus', type: 'sub', name: 'Syllabus', children: [
              // { state: 'terms', type: 'link', name: 'Syllabus Termwise' },
              { state: 'BMT-1', type: 'link', name: 'BMT-1', },
              {
                state: 'BMT-2', type: 'sub', name: 'BMT-2', children: [
                  { state: 'Map Reading', type: 'link', name: 'Map Reading' },
                  { state: 'Radio Telephony', type: 'link', name: 'Radio Telephony' },
                  { state: 'Field Engineering', type: 'link', name: 'Field Engineering' },
                  { state: 'OnA and InS', type: 'link', name: 'O&A and I&S' },
                  { state: 'Financial Management', type: 'link', name: 'Financial Management' },
                  { state: 'Leadership Trg', type: 'link', name: 'Leadership Trg' },
                ]
              },
              { state: 'soldierly', type: 'link', name: 'Soldierly' },
              { state: 'scholarly', type: 'link', name: 'Scholarly' },
              { state: 'gentlemanly', type: 'link', name: 'Gentlemanly' },
              { state: 'leaderly', type: 'link', name: 'Leaderly' },

            ]
          },
          //Study Material
          {
            state: 'study-material', type: 'sub', name: 'Study Material',
            children: [
              // { state: 'material/Bmt1', type: 'link', name: 'BMT-1', },
              { state: 'material/BMT-1', type: 'link', name: 'BMT-1', },

              {
                state: 'BMT-2', type: 'sub', name: 'BMT-2', children: [
                  { state: 'Map Reading', type: 'link', name: 'Map Reading' },
                  { state: 'Radio Telephony', type: 'link', name: 'Radio Telephony' },
                  { state: 'Field Engineering', type: 'link', name: 'Field Engineering' },
                  { state: 'OnA and InS', type: 'link', name: 'O&A and I&S' },
                  { state: 'Financial Management', type: 'link', name: 'Financial Management' },
                  { state: 'Leadership Trg', type: 'link', name: 'Leadership Trg' },
                ]
              },
              { state: 'material/Soldierly', type: 'link', name: 'Soldierly', },
              { state: 'material/Scholarly', type: 'link', name: 'Scholarly', },
              { state: 'material/Leaderly', type: 'link', name: 'Leaderly', },
              { state: 'material/Gentlemanly', type: 'link', name: 'Gentlemanly', },

            ]
          },

        ]
      },
      {
        state: 'III Term', type: 'sub', name: 'III Term', children: [

          {
            state: 'syllabus', type: 'sub', name: 'Syllabus', children: [
              // { state: 'terms', type: 'link', name: 'Syllabus Termwise' },
              { state: 'BMT-1', type: 'link', name: 'BMT-1', },
              {
                state: 'BMT-2', type: 'sub', name: 'BMT-2', children: [
                  { state: 'Map Reading', type: 'link', name: 'Map Reading' },
                  { state: 'Radio Telephony', type: 'link', name: 'Radio Telephony' },
                  { state: 'Field Engineering', type: 'link', name: 'Field Engineering' },
                  { state: 'OnA and InS', type: 'link', name: 'O&A and I&S' },
                  { state: 'Financial Management', type: 'link', name: 'Financial Management' },
                  { state: 'Leadership Trg', type: 'link', name: 'Leadership Trg' },
                ]
              },
              { state: 'soldierly', type: 'link', name: 'Soldierly' },
              { state: 'scholarly', type: 'link', name: 'Scholarly' },
              { state: 'gentlemanly', type: 'link', name: 'Gentlemanly' },
              { state: 'leaderly', type: 'link', name: 'Leaderly' },

            ]
          },
          //Study Material
          {
            state: 'study-material', type: 'sub', name: 'Study Material',
            children: [
              { state: 'material/BMT-1', type: 'link', name: 'BMT-1', },

              {
                state: 'BMT-2', type: 'sub', name: 'BMT-2', children: [
                  { state: 'Map Reading', type: 'link', name: 'Map Reading' },
                  { state: 'Radio Telephony', type: 'link', name: 'Radio Telephony' },
                  { state: 'Field Engineering', type: 'link', name: 'Field Engineering' },
                  { state: 'OnA and InS', type: 'link', name: 'O&A and I&S' },
                  { state: 'Financial Management', type: 'link', name: 'Financial Management' },
                  { state: 'Leadership Trg', type: 'link', name: 'Leadership Trg' },
                ]
              },
              { state: 'material/Soldierly', type: 'link', name: 'Soldierly', },
              { state: 'material/Scholarly', type: 'link', name: 'Scholarly', },
              { state: 'material/Leaderly', type: 'link', name: 'Leaderly', },
              { state: 'material/Gentlemanly', type: 'link', name: 'Gentlemanly', },

            ]
          },

        ]
      },

    ]
  },
  {
    id: 3,
    state: 'main/trg-team/gso-2-assessment',
    name: 'GSO-2 (ASSESSMENT)',
    type: 'sub',
    // icon: 'show_chart',

    children: [

      {
        state: 'I Term', type: 'sub', name: 'I Term', children: [
          {
            state: 'service-subjects', type: 'sub', name: 'Service Subjects', children: [
              { state: 'datesheet', type: 'link', name: 'Datesheet' },
              {
                state: 'BMT-1', type: 'sub', name: 'BMT-1', children: [
                  { state: 'General Instruction', type: 'link', name: 'General Instruction' },
                  { state: 'Resp of Eval', type: 'link', name: 'Resp of Eval' },
                  { state: 'Resp of Invigilation', type: 'link', name: 'Resp of Invigilation' },
                  { state: 'Confirmation of Marks', type: 'link', name: 'Confirmation of Marks' },
                  { state: 'Retest', type: 'link', name: 'Retest' },
                  {
                    state: 'assesment', type: 'sub', name: 'Assessment',
                    children: [
                      { state: 'mid-term', type: 'link', name: 'Mid Term' },
                      { state: 'final-term', type: 'link', name: 'Final Term' },

                    ]
                  },

                ]
              },
              {
                state: 'BMT-2', type: 'sub', name: 'BMT-2', children: [
                  { state: 'General Instruction', type: 'link', name: 'General Instruction' },
                  { state: 'Resp of Eval', type: 'link', name: 'Resp of Eval' },
                  { state: 'Resp of Invigilation', type: 'link', name: 'Resp of Invigilation' },
                  { state: 'Confirmation of Marks', type: 'link', name: 'Confirmation of Marks' },
                  { state: 'Retest', type: 'link', name: 'Retest' },
                  {
                    state: 'bmt2assessment', type: 'sub', name: 'Assessment',
                    children: [
                      { state: 'bmt2final', type: 'link', name: 'Final Term' },

                    ]
                  },

                ]
              },
            ]
          },
        ]
      },

      {
        state: 'II Term', type: 'sub', name: 'II Term', children: [
          {
            state: 'service-subjects', type: 'sub', name: 'Service Subjects', children: [
              { state: 'datesheet', type: 'link', name: 'Datesheet' },
              {
                state: 'BMT-1', type: 'sub', name: 'BMT-1', children: [
                  { state: 'General Instruction', type: 'link', name: 'General Instruction' },
                  { state: 'Resp of Eval', type: 'link', name: 'Resp of Eval' },
                  { state: 'Resp of Invigilation', type: 'link', name: 'Resp of Invigilation' },
                  { state: 'Confirmation of Marks', type: 'link', name: 'Confirmation of Marks' },
                  { state: 'Retest', type: 'link', name: 'Retest' },
                  {
                    state: 'assesment', type: 'sub', name: 'Assessment',
                    children: [
                      { state: 'mid-term', type: 'link', name: 'Mid Term' },
                      { state: 'final-term', type: 'link', name: 'Final Term' },

                    ]
                  },

                ]
              },
              {
                state: 'BMT-2', type: 'sub', name: 'BMT-2', children: [
                  { state: 'General Instruction', type: 'link', name: 'General Instruction' },
                  { state: 'Resp of Eval', type: 'link', name: 'Resp of Eval' },
                  { state: 'Resp of Invigilation', type: 'link', name: 'Resp of Invigilation' },
                  { state: 'Confirmation of Marks', type: 'link', name: 'Confirmation of Marks' },
                  { state: 'Retest', type: 'link', name: 'Retest' },
                  {
                    state: 'bmt2assessment', type: 'sub', name: 'Assessment',
                    children: [
                      { state: 'bmt2final', type: 'link', name: 'Final Term' },

                    ]
                  },
                ]
              },
            ]
          },
        ]
      },
      {
        state: 'II Tech', type: 'sub', name: 'II Tech', children: [
          {
            state: 'service-subjects', type: 'sub', name: 'Service Subjects', children: [
              { state: 'datesheet', type: 'link', name: 'Datesheet' },
              {
                state: 'BMT-1', type: 'sub', name: 'BMT-1', children: [
                  { state: 'General Instruction', type: 'link', name: 'General Instruction' },
                  { state: 'Resp of Eval', type: 'link', name: 'Resp of Eval' },
                  { state: 'Resp of Invigilation', type: 'link', name: 'Resp of Invigilation' },
                  { state: 'Confirmation of Marks', type: 'link', name: 'Confirmation of Marks' },
                  { state: 'Retest', type: 'link', name: 'Retest' },
                  {
                    state: 'assesment', type: 'sub', name: 'Assessment',
                    children: [
                      { state: 'mid-term', type: 'link', name: 'Mid Term' },
                      { state: 'final-term', type: 'link', name: 'Final Term' },

                    ]
                  },

                ]
              },
              {
                state: 'BMT-2', type: 'sub', name: 'BMT-2', children: [
                  { state: 'General Instruction', type: 'link', name: 'General Instruction' },
                  { state: 'Resp of Eval', type: 'link', name: 'Resp of Eval' },
                  { state: 'Resp of Invigilation', type: 'link', name: 'Resp of Invigilation' },
                  { state: 'Confirmation of Marks', type: 'link', name: 'Confirmation of Marks' },
                  { state: 'Retest', type: 'link', name: 'Retest' },
                  {
                    state: 'bmt2assessment', type: 'sub', name: 'Assessment',
                    children: [
                      { state: 'bmt2final', type: 'link', name: 'Final Term' },

                    ]
                  },

                ]
              },
            ]
          },
        ]
      },
      {
        state: 'III Term', type: 'sub', name: 'III Term', children: [
          {
            state: 'service-subjects', type: 'sub', name: 'Service Subjects', children: [
              { state: 'datesheet', type: 'link', name: 'Datesheet' },
              {
                state: 'BMT-1', type: 'sub', name: 'BMT-1', children: [
                  { state: 'General Instruction', type: 'link', name: 'General Instruction' },
                  { state: 'Resp of Eval', type: 'link', name: 'Resp of Eval' },
                  { state: 'Resp of Invigilation', type: 'link', name: 'Resp of Invigilation' },
                  { state: 'Confirmation of Marks', type: 'link', name: 'Confirmation of Marks' },
                  { state: 'Retest', type: 'link', name: 'Retest' },
                  {
                    state: 'assesment', type: 'sub', name: 'Assessment',
                    children: [
                      // { state: 'mid-term', type: 'link', name: 'Mid Term' },
                      { state: 'final-term', type: 'link', name: 'Final Term' },

                    ]
                  },
                ]
              },

              {
                state: 'BMT-2', type: 'sub', name: 'BMT-2', children: [
                  { state: 'General Instruction', type: 'link', name: 'General Instruction' },
                  { state: 'Resp of Eval', type: 'link', name: 'Resp of Eval' },
                  { state: 'Resp of Invigilation', type: 'link', name: 'Resp of Invigilation' },
                  { state: 'Confirmation of Marks', type: 'link', name: 'Confirmation of Marks' },
                  { state: 'Retest', type: 'link', name: 'Retest' },
                  {
                    state: 'bmt2assessment', type: 'sub', name: 'Assessment',
                    children: [
                      { state: 'bmt2final', type: 'link', name: 'Final Term' },

                    ]
                  },
                ]
              },
            ]
          },
        ]
      },

      // {
      //   state: 'service-subjects', type: 'sub', name: 'Service Subjects', children: [
      //     { state: 'datesheet', type: 'link', name: 'Datesheet' },
      //     {
      //       state: 'Bmt1', type: 'sub', name: 'BMT-1', children: [
      //         { state: 'general-instruction', type: 'link', name: 'General Instructions' },
      //         { state: 'resp-eval', type: 'link', name: 'Resp of Eval' },
      //         { state: 'confirmation-mark', type: 'link', name: 'Confirmation of marks' },
      //         { state: 'retest', type: 'link', name: 'Retest' },
      //         {
      //           state: 'retest', type: 'sub', name: 'Assessment',
      //           children: [
      //             { state: 'retest', type: 'link', name: 'Mid Term' },
      //             { state: 'retest', type: 'link', name: 'Final Term' },

      //           ]
      //         },

      //       ]
      //     },
      //     {
      //       state: 'BMT-2', type: 'sub', name: 'BMT-2', children: [
      //         { state: 'general-instruction', type: 'link', name: 'General Instructions' },
      //         { state: 'resp-eval', type: 'link', name: 'Resp of Eval' },
      //         { state: 'confirmation-mark', type: 'link', name: 'Confirmation of marks' },
      //         { state: 'retest', type: 'link', name: 'Retest' },
      //         { state: 'retest', type: 'link', name: 'Assessment' },

      //       ]
      //     },
      //   ]
      // },

    ]


  },
  {
    id: 4,
    state: 'main/trg-team/adventure-cell',
    name: 'Adventure Cell',
    type: 'sub',
    // icon: 'show_chart',
    children: [
      { state: 'general-instruction', type: 'link', name: 'General Instructions' },
      { state: 'letters', type: 'link', name: 'Letters' },
      { state: 'transport', type: 'link', name: 'Transport Demand' },
      { state: 'sops', type: 'link', name: 'SOPs' },
      { state: 'nominal', type: 'link', name: 'Nominal Roll' },
      { state: 'chart', type: 'link', name: 'Charts' },
      { state: 'report', type: 'link', name: 'Reports' },
      {
        state: 'clubs',
        name: 'CLUBS',
        type: 'sub',
        children: [
          {
            state: 'day-wise', type: 'link', name: 'Day Wise Programme'
          },
          {
            state: 'sops', type: 'link', name: 'SOPs'
          },
          {
            state: 'nominal', type: 'link', name: 'OC Nominal Roll'
          },

        ]
      },


    ]
  },
  {
    id: 5,
    state: 'main/trg-team/weapon',
    name: 'Weapon Training',
    type: 'sub',
    children: [
      {
        state: '', name: 'Add Weapons', type: 'sub',
        children: [
          { state: 'add-exam-param', name: 'Add Exam Parameter', type: 'link' },
          { state: Routings.addWeaponsPath, name: 'Add Weapon', type: 'link' },
          { state: 'weapons/1', name: 'Weapons I Term', type: 'link' },
          { state: 'weapons/2', name: 'Weapons II Term', type: 'link' },
          { state: 'weapons/7', name: 'Weapons II Tech', type: 'link' },
          { state: 'weapons/3', name: 'Weapons III Term', type: 'link' },

        ]
      },
      {
        state: 'training/I Term', type: 'link', name: 'I Term',
      },
      {
        state: 'training/II Term', type: 'link', name: 'II Term',
      },
      {
        state: 'training/II Tech', type: 'link', name: 'II Tech',
      },
      {
        state: 'training/III Term', type: 'link', name: 'III Term',
      },

    ]
  },
  {
    id: 6,
    state: 'main/trg-team/runback',
    name: 'Runback',
    type: 'sub',
    children: [
      {
        state: 'I-Term', type: 'link', name: 'I Term',
      },
      {
        state: 'II-Term', type: 'link', name: 'II Term',
      },
      {
        state: 'II-Tech', type: 'link', name: 'II Tech',
      },
      {
        state: 'III-Term', type: 'link', name: 'III Term',
      },

    ]
  },
  {
    id: 7,
    state: 'main/trg-team/route-march',
    name: 'Route March',
    type: 'sub',
    children: [
      {
        state: 'I-Term', type: 'link', name: 'I Term',
      },
      {
        state: 'II-Term', type: 'link', name: 'II Term',
      },
      {
        state: 'II-Tech', type: 'link', name: 'II Tech',
      },
      {
        state: 'III-Term', type: 'link', name: 'III Term',
      },

    ]
  },
  {
    id: 8,
    state: 'main/trg-team/mr-prac',
    name: 'MR Prac',
    type: 'sub',
    children: [
      {
        state: 'I-Term', type: 'link', name: 'I Term',
      },
      {
        state: 'II-Term', type: 'link', name: 'II Term',
      },
      {
        state: 'II-Tech', type: 'link', name: 'II Tech',
      },
      {
        state: 'III-Term', type: 'link', name: 'III Term',
      },

    ]
  },
  {
    id: 9,
    state: 'main/trg-team/pt',
    name: 'PT',
    type: 'sub',
    children: [
      {
        state: 'I Term', type: 'sub', name: 'I Term',
        children: [
          { state: 'PPT', type: 'link', name: 'PPT' },
          { state: 'IPET', type: 'link', name: 'IPET' },
          { state: 'SWM', type: 'link', name: 'SWM' },
          { state: 'SOT', type: 'link', name: 'SOT' },

        ]
      },
      {
        state: 'II Tech', type: 'sub', name: 'II Tech',
        children: [
          { state: 'PPT', type: 'link', name: 'PPT' },
          { state: 'IPET', type: 'link', name: 'IPET' },
          { state: 'SWM', type: 'link', name: 'SWM' },
          { state: 'SOT', type: 'link', name: 'SOT' },
        ]
      },
      {
        state: 'II Term', type: 'sub', name: 'II Term',
        children: [
          { state: 'PPT', type: 'link', name: 'PPT' },
          { state: 'IPET', type: 'link', name: 'IPET' },
          { state: 'SWM', type: 'link', name: 'SWM' },
          { state: 'CTOT', type: 'link', name: 'ROT' },

        ]
      },

      {
        state: 'III Term', type: 'sub', name: 'III Term',
        children: [
          { state: 'BPET', type: 'link', name: 'BPET' },
          { state: 'PPT', type: 'link', name: 'PPT' },
          { state: 'SWM', type: 'link', name: 'SWM' },
          { state: 'ROT', type: 'link', name: 'ROT' },

        ]
      },

    ]


  },
  {
    id: 10,
    state: 'main/trg-team/eqtnnew',
    name: 'EQTN',
    type: 'sub',
    children: [
      {
        state: 'I Term', type: 'link', name: 'I Term',
      },
      {
        state: 'II Term', type: 'link', name: 'II Term',
      },
      {
        state: 'II Tech', type: 'link', name: 'II Tech',
      },
      {
        state: 'III Term', type: 'link', name: 'III Term',
      },

    ]
    // icon: ''
  },
  {
    id: 11,
    state: 'main/trg-team/oqeqtnnew',
    name: 'OQ EQTN',
    type: 'sub',
    children: [
      {
        state: 'I TERM', type: 'sub', name: 'I TERM',
        children: [

          { state: 'MID TERM', type: 'link', name: 'MID TERM' },
          { state: 'FINAL TERM', type: 'link', name: 'FINAL TERM' },
        ]
      },
      {
        state: 'II TERM', type: 'sub', name: 'II TERM',
        children: [
          { state: 'MID TERM', type: 'link', name: 'MID TERM' },
          { state: 'FINAL TERM', type: 'link', name: 'FINAL TERM' },

        ]
      },

      {
        state: 'II TECH', type: 'sub', name: 'II Tech',
        children: [
          { state: 'MID TERM', type: 'link', name: 'MID TERM' },
          { state: 'FINAL TERM', type: 'link', name: 'FINAL TERM' },
        ]
      },


      {
        state: 'III TERM', type: 'sub', name: 'III TERM',
        children: [
          { state: 'MID TERM', type: 'link', name: 'MID TERM' },
          { state: 'FINAL TERM', type: 'link', name: 'FINAL TERM' },

        ]
      },

    ]


  },

  {
    id: 12,
    state: 'main/trg-team/sports',
    name: 'SPORTS',
    type: 'sub',
    children: [
      {
        state: 'I Term', type: 'sub', name: 'I Term', children: [
          {
            state: 'SPRING TERM', type: 'link', name: 'SPRING TERM',
          },
          {
            state: 'AUTUMN TERM	', type: 'link', name: 'AUTUMN TERM	',
          }

        ]
      },

      {
        state: 'II Tech', type: 'sub', name: 'II Tech', children: [


          {
            state: 'SPRING TERM', type: 'link', name: 'SPRING TERM',
          },
          {
            state: 'AUTUMN TERM	', type: 'link', name: 'AUTUMN TERM	',
          }

        ]
      },

      {
        state: 'II Term', type: 'sub', name: 'II Term', children: [


          {
            state: 'SPRING TERM', type: 'link', name: 'SPRING TERM',
          },
          {
            state: 'AUTUMN TERM	', type: 'link', name: 'AUTUMN TERM	',
          }

        ]
      },

      {
        state: 'III Term', type: 'sub', name: 'III Term', children: [


          {
            state: 'SPRING TERM', type: 'link', name: 'SPRING TERM',
          },
          {
            state: 'AUTUMN TERM	', type: 'link', name: 'AUTUMN TERM	',
          }

        ]
      },


    ]
  },
  {
    id: 'common',
    state: 'main/trg-team/reports',
    name: 'Reports',
    type: 'sub',
    children:[
      {
        state: 'I Term', name: 'I Term', type: 'link'
      },  
      {
        state: 'II Tech', name: 'II Tech', type: 'link'
      },
      {
        state: 'II Term', name: 'II Term', type: 'link'
      },
  
      {
        state: 'III Term', name: 'III Term', type: 'link'
      },
    ]
    // icon: ''
  },
  {
    id: 'common',
    state: 'main/trg-team/ima-blog',
    name: 'IMA Blog',
    type: 'link',
    // icon: ''
  },
  {
    id: 'common',
    state: 'main/trg-team/complaint',
    name: 'Complaints/Requirement',
    type: 'sub',
    children:[
      {
        state: 'it', name: 'OC-IT', type: 'link'
      },
    ]
    // icon: ''
  },
  {
    id: 'common',
    state: 'main/trg-team/i-card',
    name: 'Officers I-Cards',
    type: 'link',
    // icon: ''
  },
  {
    // id: 47,
    state: 'main/trg-team/home',
    name: 'Home',
    type: 'sub',
    // icon: 'map',
    children: [
      { state: 'events', name: 'Upcoming Events', type: 'link' },
      // { state: 'special-occasions', name: 'Social List', type: 'link' },
      { state: 'programes', name: 'Comdt. Daily PGME', type: 'link' },
      { state: 'messages', name: 'Comdt. Message', type: 'link' },
      { state: 'activity', name: 'IMA Activities', type: 'link' },
      { state: 'greybook', name: 'Greybook', type: 'link' },
      { state: 'central-library-management', name: 'Central Library', type: 'link' },
      { state: 'cyber-policy', name: 'Cyber Policy', type: 'link' },
      { state: 'book-list', name: 'IMA Recommended Reading List', type: 'link' },
      { state: 'announcement', name: 'Announcements', type: 'link' },
      // { state: 'social-list', name: 'Social List', type: 'link' },
      { state: 'section-hospital', name: 'Section Hospital', type: 'link' },
      { state: 'gc-msg', name: 'OC Message Board', type: 'link' },

      {
        state: 'hall-of-fame', name: 'Hall of Fame', type: 'sub', children: [
          { state: 'gallantry-awardees', name: 'Gallantry Awardees', type: 'link' },
        ]
      },
      // { state: 'ima-blog', name: 'IMA Blog', type: 'link' },

    ]
  },
]


const TRGBattalionMenus = [

  {
    id: 'common',
    state: 'main/trg-battalion/dashboard',
    name: 'DASHBOARD',
    type: 'link',
  },
  {
    id: 13,
    state: 'main/trg-battalion/bro',
    name: 'BRO',
    type: 'link',
  },
  // {
  //   id: 14,
  //   state: 'main/trg-battalion/bdo',
  //   name: 'BDO',
  //   type: 'link',
  // },
  {
    id: 15,
    state: 'main/trg-battalion/assignment-of-duties',
    name: 'Assignments of Duties',
    type: 'link'
  },
  {
    id: 16,
    state: 'main/trg-battalion/gc-database',
    name: 'OC Database',
    type: 'link',
  },
  {
    id: 17,
    state: 'main/trg-battalion/oq-marks',
    name: 'OQ Marks',
    type: 'sub',
    children: [
      {
        state: 'I Term', type: 'sub', name: 'I Term',
        children: [

          { state: 'MID TERM', type: 'link', name: 'MID TERM' },
          { state: 'FINAL TERM', type: 'link', name: 'FINAL TERM' },
        ]
      },
      {
        state: 'II Term', type: 'sub', name: 'II Term',
        children: [

          { state: 'MID TERM', type: 'link', name: 'MID TERM' },
          { state: 'FINAL TERM', type: 'link', name: 'FINAL TERM' },
        ]
      },
      {
        state: 'II Tech', type: 'sub', name: 'II Tech',
        children: [

          { state: 'MID TERM', type: 'link', name: 'MID TERM' },
          { state: 'FINAL TERM', type: 'link', name: 'FINAL TERM' },
        ]
      },
      {
        state: 'III Term', type: 'sub', name: 'III Term',
        children: [

          { state: 'MID TERM', type: 'link', name: 'MID TERM' },
          { state: 'FINAL TERM', type: 'link', name: 'FINAL TERM' },
        ]
      },

    ]
  },
  {
    id: 18,
    state: 'main/trg-battalion/camp-marks',
    name: 'Camp Marks',
    type: 'sub',
    children: [
      {
        state: 'I Term', type: 'link', name: 'I Term',
      },
      {
        state: 'II Term', type: 'link', name: 'II Term',
      },
      {
        state: 'II Tech', type: 'link', name: 'II Tech',
      },
      {
        state: 'III Term', type: 'link', name: 'III Term',
      },

    ]
  },
  {
    id: 19,
    state: 'main/trg-battalion/runback',
    name: 'Runback',
    type: 'sub',
    children: [
      {
        state: 'I-Term', type: 'link', name: 'I Term',
      },
      {
        state: 'II-Term', type: 'link', name: 'II Term',
      },
      {
        state: 'II-Tech', type: 'link', name: 'II Tech',
      },
      {
        state: 'III-Term', type: 'link', name: 'III Term',
      },

    ]

  },
  {
    id: 20,
    state: 'main/trg-battalion/route-march',
    name: 'Route March',
    type: 'sub',
    children: [
      {
        state: 'I-Term', type: 'link', name: 'I Term',
      },
      {
        state: 'II-Term', type: 'link', name: 'II Term',
      },
      {
        state: 'II-Tech', type: 'link', name: 'II Tech',
      },
      {
        state: 'III-Term', type: 'link', name: 'III Term',
      },

    ]
  },
  {
    id: 21,
    state: 'main/trg-battalion/mr-prac',
    name: 'MR Prac',
    type: 'sub',
    children: [
      {
        state: 'I-Term', type: 'link', name: 'I Term',
      },
      {
        state: 'II-Term', type: 'link', name: 'II Term',
      },
      {
        state: 'II-Tech', type: 'link', name: 'II Tech',
      },
      {
        state: 'III-Term', type: 'link', name: 'III Term',
      },

    ]
  },
  {
    id: 22,
    state: 'main/trg-battalion/parade-state',
    name: 'Parade State of GCs',
    type: 'link',
  },
  {
    id: 23,
    state: 'main/trg-battalion/location-state',
    name: 'Location State of Officers',
    type: 'link',
  },
  {
    id: 'common',
    state: 'main/trg-battalion/ima-blog',
    name: 'IMA Blog',
    type: 'link',
    // icon: ''
  },
  {
    id: 'common',
    state: 'main/trg-battalion/complaint',
    name: 'Complaints/Requirement',
    type: 'sub',
    children:[
      {
        state: 'mes', type: 'link', name: 'OC-MES',
      },
      {
        state: 'personal-kit-items', type: 'link', name: 'OC-Personal Kit',
      },
      {
        state: 'additional-items', type: 'link', name: 'OC-Additional Items',
      },
    ]
  },
  {
    id: 'common',
    state: 'main/trg-battalion/i-card',
    name: 'Officers I-Cards',
    type: 'link',
    // icon: ''
  },

]

const ADJUTANT_MENU = [
  {
    id:'common',
    state: 'main/adjutant-branch/dashboard',
    name: 'DASHBOARD',
    type: 'link',
    // icon: ''
  },
  {
    id: 37,
    state: 'main/adjutant-branch/aro',
    name: 'ARO',
    type: 'link',
    // icon: ''
  },
  {
    id: 37,
    state: 'main/adjutant-branch/bro',
    name: 'BRO',
    type: 'link',
    // icon: ''
  },
  {
    id: 38,
    state: 'main/adjutant-branch/adjutant-orders',
    name: 'Adjutant Orders',
    type: 'link',
    // icon: ''
  },
  {
    id: 39,
    state: 'main/adjutant-branch/general-instruction',
    name: 'General Instruction',
    type: 'sub',
    children: [
      { state: 'reception', name: 'Reception of new GCs', type: 'link' },
      { state: 'pop', name: 'POP', type: 'link' },
      { state: 'sop', name: 'SOPs', type: 'link' },
      // {
      //   state: 'drill-comp', name: 'Drill-competition', type: 'sub',
      //   children: [
      //     // { state: 'schedule', name: 'Schedule', type: 'link' },
      //     // { state: 'drill-marks', name: 'Drill Marks', type: 'link' },

      //     {
      //       state: 'I Term', name: 'I Term', type: 'sub', children: [
      //         { state: 'schedule', name: 'Schedule', type: 'link' },
      //         {
      //           state: 'drill-marks', name: 'Drill Marks', type: 'link'
      //           // 'sub' , children:[ { state: 'khali hath', name: 'Khali Hath', type: 'link' } ]
      //         },
      //         {
      //           state: 'drill-oq',
      //           name: 'OQ Drill',
      //           type: 'sub',
      //           children: [
      //             {
      //               state: 'Mid-Term', type: 'link', name: 'Mid Term',
      //             },
      //             {
      //               state: 'Final-Term', type: 'link', name: 'Final Term',
      //             }
      //           ]
      //         },
      //       ]
      //     },
      //     {
      //       state: 'II Term', name: 'II Term', type: 'sub', children: [
      //         { state: 'schedule', name: 'Schedule', type: 'link' },
      //         {
      //           state: 'drill-marks', name: 'Drill Marks', type: 'link'
      //           // 'sub' , children:[ { state: 'khali hath', name: 'Khali Hath', type: 'link' } ]
      //         },
      //         {
      //           state: 'drill-oq',
      //           name: 'OQ Drill',
      //           type: 'sub',
      //           children: [
      //             {
      //               state: 'Mid-Term', type: 'link', name: 'Mid Term',
      //             },
      //             {
      //               state: 'Final-Term', type: 'link', name: 'Final Term',
      //             }
      //           ]
      //         },
      //       ]
      //     },
      //     {
      //       state: 'II Tech', name: 'II Tech', type: 'sub', children: [
      //         { state: 'schedule', name: 'Schedule', type: 'link' },
      //         {
      //           state: 'drill-marks', name: 'Drill Marks', type: 'link'
      //           // 'sub' , children:[ { state: 'khali hath', name: 'Khali Hath', type: 'link' } ]
      //         },
      //         {
      //           state: 'drill-oq',
      //           name: 'OQ Drill',
      //           type: 'sub',
      //           children: [
      //             {
      //               state: 'Mid-Term', type: 'link', name: 'Mid Term',
      //             },
      //             {
      //               state: 'Final-Term', type: 'link', name: 'Final Term',
      //             }
      //           ]
      //         },
      //       ]
      //     },

      //     {
      //       state: 'III Term', name: 'III Term', type: 'sub', children: [
      //         { state: 'schedule', name: 'Schedule', type: 'link' },
      //         {
      //           state: 'drill-marks', name: 'Drill Marks', type: 'link'
      //           // 'sub' , children:[ { state: 'khali hath', name: 'Khali Hath', type: 'link' } ]
      //         },
      //         {
      //           state: 'drill-oq',
      //           name: 'OQ Drill',
      //           type: 'sub',
      //           children: [
      //             {
      //               state: 'Mid-Term', type: 'link', name: 'Mid Term',
      //             },
      //             {
      //               state: 'Final-Term', type: 'link', name: 'Final Term',
      //             }
      //           ]
      //         },
      //       ]
      //     },
      //   ]

      // },

    ]
  },
  {
    id: 40,
    state: 'main/adjutant-branch/academy-parade',
    name: 'Academy Parade State',
    type: 'link',
    // icon: ''
  },
  {
    id: 41,
    state: 'main/adjutant-branch/officer-parade',
    name: 'Officer Parade / Location State',
    type: 'link'
  },
  {
    id: 42,
    state: 'main/adjutant-branch/social-list',
    name: 'Social List',
    type: 'link'
  },
  {
    id: 43,
    state: 'main/adjutant-branch/record',
    name: 'Record of Service',
    type: 'link'
  },
  {
    id: 44,
    state: 'main/adjutant-branch/drill-comp',
    name: 'Drill Competetion',
    type: 'sub',
    children: [
      {
        // state: 'I Term', name: 'I Term', type: 'sub', children: [
          
            state: 'Schedule', type: 'link', name: 'Schedule',
          },
          {
            state: 'Result', type: 'link', name: 'Result',
          }
        // ]
      
      // {
      //   state: 'II Term', name: 'II Term', type: 'sub', children: [
      //     {
      //       state: 'Schedule', type: 'link', name: 'Schedule',
      //     },
      //     {
      //       state: 'Result', type: 'link', name: 'Result',
      //     }
      //   ]
      // },
      // {
      //   state: 'II Tech', name: 'II Tech', type: 'sub', children: [
      //     {
      //       state: 'Schedule', type: 'link', name: 'Schedule',
      //     },
      //     {
      //       state: 'Result', type: 'link', name: 'Result',
      //     }
      //   ]
      // },
      // {
      //   state: 'III Term', name: 'III Term', type: 'sub', children: [
      //     {
      //       state: 'Schedule', type: 'link', name: 'Schedule',
      //     },
      //     {
      //       state: 'Result', type: 'link', name: 'Result',
      //     }
      //   ]
      // },
    ]
  },
  {
    id: 45,
    state: 'main/adjutant-branch/drill',
    name: 'Drill',
    type: 'sub',
    children: [
      // { state: 'schedule', name: 'Schedule', type: 'link' },
      // { state: 'drill-marks', name: 'Drill Marks', type: 'link' },

      {
        state: 'I Term', name: 'I Term', type: 'sub', children: [
          {
            state: 'drill-marks', name: 'Drill Marks', type: 'link'
            // 'sub' , children:[ { state: 'khali hath', name: 'Khali Hath', type: 'link' } ]
          },
          {
            state: 'drill-oq',
            name: 'OQ Drill',
            type: 'sub',
            children: [
              {
                state: 'Mid-Term', type: 'link', name: 'Mid Term',
              },
              {
                state: 'Final-Term', type: 'link', name: 'Final Term',
              }
            ]
          },
        ]
      },
      {
        state: 'II Term', name: 'II Term', type: 'sub', children: [
          {
            state: 'drill-marks', name: 'Drill Marks', type: 'link'
            // 'sub' , children:[ { state: 'khali hath', name: 'Khali Hath', type: 'link' } ]
          },
          {
            state: 'drill-oq',
            name: 'OQ Drill',
            type: 'sub',
            children: [
              {
                state: 'Mid-Term', type: 'link', name: 'Mid Term',
              },
              {
                state: 'Final-Term', type: 'link', name: 'Final Term',
              }
            ]
          },
        ]
      },
      {
        state: 'II Tech', name: 'II Tech', type: 'sub', children: [
          {
            state: 'drill-marks', name: 'Drill Marks', type: 'link'
          },
          {
            state: 'drill-oq',
            name: 'OQ Drill',
            type: 'sub',
            children: [
              {
                state: 'Mid-Term', type: 'link', name: 'Mid Term',
              },
              {
                state: 'Final-Term', type: 'link', name: 'Final Term',
              }
            ]
          },
        ]
      },

      {
        state: 'III Term', name: 'III Term', type: 'sub', children: [
          {
            state: 'drill-marks', name: 'Drill Marks', type: 'link'
          },
          {
            state: 'drill-oq',
            name: 'OQ Drill',
            type: 'sub',
            children: [
              {
                state: 'Mid-Term', type: 'link', name: 'Mid Term',
              },
              {
                state: 'Final-Term', type: 'link', name: 'Final Term',
              }
            ]
          },
        ]
      },
    ]
  },
  {
    id: 46,
    state: 'main/adjutant-branch/punishments',
    name: 'Punishments',
    type: 'link'
  },
  {
    // id: 47,
    state: 'main/adjutant-branch/home',
    name: 'Home',
    type: 'sub',
    // icon: 'map',
    children: [
      { state: 'events', name: 'Upcoming Events', type: 'link' },
      // { state: 'special-occasions', name: 'Social List', type: 'link' },
      { state: 'programes', name: 'Comdt. Daily PGME', type: 'link' },
      { state: 'messages', name: 'Comdt. Message', type: 'link' },
      { state: 'activity', name: 'IMA Activities', type: 'link' },
      { state: 'greybook', name: 'Greybook', type: 'link' },
      { state: 'central-library-management', name: 'Central Library', type: 'link' },
      { state: 'cyber-policy', name: 'Cyber Policy', type: 'link' },
      { state: 'book-list', name: 'IMA Recommended Reading List', type: 'link' },
      { state: 'announcement', name: 'Announcements', type: 'link' },
      // { state: 'social-list', name: 'Social List', type: 'link' },
      { state: 'section-hospital', name: 'Section Hospital', type: 'link' },
      { state: 'gc-msg', name: 'OC Message Board', type: 'link' },

      {
        state: 'hall-of-fame', name: 'Hall of Fame', type: 'sub', children: [
          { state: 'gallantry-awardees', name: 'Gallantry Awardees', type: 'link' },
        ]
      },
      // { state: 'ima-blog', name: 'IMA Blog', type: 'link' },

    ]
  },


  // { state: 'identity-card', name: 'Identity Card', type: 'link' },
  // {
  //   state: 'main/adjutant-branch/comissioning Documents',
  //   name: 'Comissioning Documents',
  //   type: 'link',
  //   // icon: ''
  // },
  // {
  //   state: 'main/adjutant-branch/drill-precis',
  //   name: 'Drill-precis',
  //   type: 'link',
  //   // icon: ''
  // },
  // {
  //   state: 'main/adjutant-branch/officers-ms',
  //   name: 'Officers-MS',
  //   type: 'sub',
  //   // icon: 'map',
  //   children: [
  //     { state: 'adjutant orders', name: 'Adjutant orders', type: 'link' },
  //     { state: 'officers I-card', name: 'Officers I-card', type: 'link' },
  //     { state: 'drill Marks', name: 'drill Marks', type: 'link' },
  //     { state: 'OC database', name: 'OC Database', type: 'link' },
  //   ]
  // },
  {
    id: 'common',
    state: 'main/adjutant-branch/ima-blog',
    name: 'IMA Blog',
    type: 'link',
    // icon: ''
  },
  {
    id: "common",
    state: 'main/adjutant-branch/it',
    name: 'Complaints/Requirement',
    type: 'link',
    // icon: ''
  },
  {
    id: "common",
    state: 'main/adjutant-branch/i-card',
    name: 'Officers I-Cards',
    type: 'link',
    // icon: ''
  },

]


const GS_BRANCH_MENUS = [
  {
    id: "common",
    state: 'main/gs-branch/dashboard',
    name: 'Dashboard',
    type: 'link',
    // icon: ''
  },
  // {
  //   id: 33,
  //   state: 'main/gs-branch/coord',
  //   name: 'Coord',
  //   type: 'link',
  //   // icon: ''
  // },
  {
    state: 'main/gs-branch/home',
    name: 'Home',
    type: 'sub',
    // icon: 'map',
    children: [
      { state: 'events', name: 'Upcoming Events', type: 'link' },
      // { state: 'special-occasions', name: 'Social List', type: 'link' },
      { state: 'programes', name: 'Comdt. Daily PGME', type: 'link' },
      { state: 'messages', name: 'Comdt. Message', type: 'link' },
      { state: 'activity', name: 'IMA Activities', type: 'link' },
      { state: 'greybook', name: 'Greybook', type: 'link' },
      { state: 'central-library-management', name: 'Central Library', type: 'link' },
      { state: 'cyber-policy', name: 'Cyber Policy', type: 'link' },
      { state: 'book-list', name: 'IMA Recommended Reading List', type: 'link' },
      { state: 'announcement', name: 'Announcements', type: 'link' },
      // { state: 'social-list', name: 'Social List', type: 'link' },
      { state: 'section-hospital', name: 'Section Hospital', type: 'link' },
      { state: 'gc-msg', name: 'OC Message Board', type: 'link' },

      {
        state: 'hall-of-fame', name: 'Hall of Fame', type: 'sub', children: [
          { state: 'gallantry-awardees', name: 'Gallantry Awardees', type: 'link' },
        ]
      },
      { state: 'ima-blog', name: 'IMA Blog', type: 'link' },

    ]
  },
  {
    id: 34,
    state: 'main/gs-branch/stats',
    name: 'Stats',
    type: 'sub',
    // icon: 'map',
    children: [

      { state: 'academy-parade-state', name: 'Academy Parade State', type: 'link' },

      {
        state: 'guidelines', type: 'sub', name: 'Imp Policy Guidelines', children: [

          { state: 'administrative-instructions', name: 'Administrative Instructions', type: 'link' },
          { state: 'standing-trg-directives', name: 'Standing TRG Directives', type: 'link' },
          { state: 'fgc-policy', name: 'FGC Policy', type: 'link' },
          { state: 'pcab-coa', name: 'PCAB & COA', type: 'link' },
          { state: 'misc', name: 'Misc', type: 'link' },

        ]
      },

      {
        state: 'current-cases', type: 'sub', name: 'Current Cases', children: [
          { state: 'court-cases', name: 'Court Cases', type: 'link' },
          { state: 'relegation', name: 'Relegation', type: 'link' },
          { state: 'resignation', name: 'Resignation', type: 'link' },
          { state: 'withdrawal', name: 'Withdrawal', type: 'link' },

        ]
      },

      {
        state: 'assessment', type: 'sub', name: 'Assessment', children: [

          { state: 'schedule', name: 'Schedule', type: 'link' },
          { state: 'matrix', name: 'Matrix', type: 'link' },
        ]
      },

      {
        state: 'document-checkboard', type: 'sub', name: 'Document Checkboard', children: [
          { state: 'pending-cvr-cases', name: 'Pending CVR cases', type: 'link' },
          { state: 'pending-education-docs', name: 'Pending Education Docs', type: 'link' },
          { state: 'pending-confirmation', name: 'Pending Confirmation from Line Directorate', type: 'link' },
          { state: 'pc-list', name: 'PC List', type: 'link' },
          { state: 'aviation-list', name: 'Aviation List', type: 'link' },
          { state: 'para-list', name: 'Para List', type: 'link' },
          { state: '61-cav-list', name: '61 Cav List', type: 'link' },
        ]
      },

      {
        state: 'stats', type: 'sub', name: 'Stats', children: [
          { state: 'intake', name: 'Intake', type: 'link' },
          { state: 'poc', name: 'POC', type: 'link' },
        ]
      },

    ]
  },
  {
    id: 35,
    state: 'main/gs-branch/security',
    name: 'Security',
    type: 'sub',
    // icon: '',
    children: [
      { state: 'territorial', name: 'Territorial Army', type: 'link' },
      { state: 'dsc', name: 'DSC', type: 'link' },
      { state: 'rp', name: 'RP Sec', type: 'link' },
      { state: 'demo', name: 'Demo Coy', type: 'link' },
      {
        state: 'apparatus', name: 'Security Apparatus', type: 'sub', children: [
          { state: 'sre', name: 'SRE', type: 'link' },
          { state: 'acs', name: 'ACS FP', type: 'link' },
          { state: 'other-security', name: 'Other Security Infra', type: 'link' },
          { state: 'communication-infra', name: 'Communication Infra', type: 'link' },
        ]
      },
      { state: 'policies', name: 'Policies/Imp Letters/Advisories', type: 'link' },
      {
        state: 'access-control', name: 'Access Control', type: 'sub', children: [
          { state: 'biometric-rfid', name: 'Biometric RFID Card', type: 'link' },
          { state: 'vehicle-sticker', name: 'Vehicle StickersACS FP', type: 'link' },
          {
            state: 'entry-passes', name: 'Entry Passes', type: 'sub', children: [
              { state: 'combat', name: 'Combat', type: 'link' },
              { state: 'civ', name: 'Def / Civ staff', type: 'link' },
              { state: 'casual', name: 'Casual staff', type: 'link' },
            ]
          }
        ]
      },
      {
        state: 'info-security', name: 'Info Security', type: 'sub', children: [
          { state: 'policies', name: 'Policies / Advisories', type: 'link' },
          { state: 'return', name: 'Reports / Returns', type: 'link' },
        ]
      },
      {
        state: 'prophylactic', name: 'Prophylactic Security', type: 'sub', children: [
          { state: 'prophylactic-policies', name: 'Policies / Advisories', type: 'link' },
          { state: 'prophylactic-reports', name: 'Reports / Returns', type: 'link' },
        ]
      },
      {
        state: 'intelligence', name: 'Intelligence', type: 'sub', children: [
          { state: 'intelligence-policies', name: 'Policies / Advisories', type: 'link' },
          { state: 'intelligence-reports', name: 'Reports / Returns', type: 'link' },
        ]
      },
    ]
  },

  {
    id: "common",
    state: 'main/gs-branch/itcommunication',
    name: 'IT & Communication',
    type: 'sub',
    // icon: '',
    children: [
      {
        state: 'charter', name: 'Charter', type: 'sub', children: [
          { state: 'it-sec', name: 'IT Sec', type: 'link',
          
         },
          { state: 'communication-sec', name: 'Communication Sec', type: 'link' },
        ]
      },
      { state: 'itppp', name: 'IT PPP', type: 'link' },
      // {
      //   state: 'complaints', name: 'Complaints / Requirements', type: 'link',
      // },
      {
        state: 'complaints-requirements', name: 'Complaints / Requirements', type: 'sub', children: [
          { state: 'it-gcComplaint', name: 'OC IT Complaint', type: 'link'},
          { state: 'it', name: 'IT', type: 'link'},
          { state: 'communication', name: 'Communication', type: 'link' },
        ]
      },

    ]
  },
  {
    id: 'common',
    state: 'main/gs-branch/ima-blog',
    name: 'IMA Blog',
    type: 'link',
    // icon: ''
  },
  {
    id: "common",
    state: 'main/gs-branch/i-card',
    name: 'Officers I-Cards',
    type: 'link',
    // icon: ''
  },


]

const GS_EXERCISE_TYPE_MENUS = [
  {
    state: 'main/admin/exercise-type/',
    name: 'Exercise-Type',
    type: 'link',
    // icon: ''
    // children: [
    //   { state: 'exercise-type', name: 'Ex', type: 'link' },
    // ]
  },
]

const ACADEMIC_DEPARTMENT = [
  {
    id: "common",
    state: 'main/academic-depart/dashboard',
    name: 'DASHBOARD',
    type: 'link',
    // icon: ''
  },
  // {
  //   state: 'main/academic-depart/about',
  //   name: 'ABOUT',
  //   type: 'link',
  //   // icon: ''
  // },

  {
    id: 24,
    state: 'main/academic-depart/subjects',
    name: 'SUBJECTS',
    type: 'sub',
    // icon: 'map',
    children: [
      // {
      //   state: 'I Term', type: 'sub', name: 'I Term', children: [

      //     {
      //       state: 'Paper 1', type: 'sub', name: 'Paper 1', children: [
      //         { state: 'Military History', name: 'Military History', type: 'link' },
      //         { state: 'Military Geography', name: 'Military Geography', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 2', type: 'sub', name: 'Paper 2', children: [
      //         { state: 'CAIR', name: 'CAIR ', type: 'link' },
      //         { state: 'BS', name: 'BS', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 3', type: 'sub', name: 'Paper 3', children: [
      //         { state: 'Science and Warfare', name: 'Science & Warfare', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 4', type: 'sub', name: 'Paper 4', children: [
      //         { state: 'SWT', name: 'SWT', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 5', type: 'sub', name: 'Paper 5', children: [
      //         { state: 'ECS', name: 'ECS', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 6', type: 'sub', name: 'Paper 6', children: [
      //         { state: 'IT', name: 'IT ', type: 'link' },
      //       ]
      //     }

      //   ]
      // },

      // {
      //   state: 'II Tech', type: 'sub', name: 'II Tech', children: [

      //     {
      //       state: 'Paper 1', type: 'sub', name: 'Paper 1', children: [
      //         { state: 'Military History', name: 'Military History', type: 'link' },
      //         { state: 'Military Geography', name: 'Military Geography', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 2', type: 'sub', name: 'Paper 2', children: [
      //         { state: 'CAIR', name: 'CAIR ', type: 'link' },
      //         { state: 'BS', name: 'BS', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 3', type: 'sub', name: 'Paper 3', children: [
      //         { state: 'Science and Warfare', name: 'Science & Warfare', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 4', type: 'sub', name: 'Paper 4', children: [
      //         { state: 'SWT', name: 'SWT', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 5', type: 'sub', name: 'Paper 5', children: [
      //         { state: 'ECS', name: 'ECS', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 6', type: 'sub', name: 'Paper 6', children: [
      //         { state: 'IT', name: 'IT ', type: 'link' },
      //       ]
      //     }
      //   ]
      // },

      // {
      //   state: 'II Term', type: 'sub', name: 'II Term', children: [

      //     {
      //       state: 'Paper 1', type: 'sub', name: 'Paper 1', children: [
      //         { state: 'Military History', name: 'Military History', type: 'link' },
      //         { state: 'Military Geography', name: 'Military Geography', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 2', type: 'sub', name: 'Paper 2', children: [
      //         { state: 'CAIR', name: 'CAIR ', type: 'link' },
      //         { state: 'BS', name: 'BS', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 3', type: 'sub', name: 'Paper 3', children: [
      //         { state: 'Science and Warfare', name: 'Science & Warfare', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 4', type: 'sub', name: 'Paper 4', children: [
      //         { state: 'SWT', name: 'SWT', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 5', type: 'sub', name: 'Paper 5', children: [
      //         { state: 'ECS', name: 'ECS', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 6', type: 'sub', name: 'Paper 6', children: [
      //         { state: 'IT', name: 'IT ', type: 'link' },
      //       ]
      //     }
      //   ]
      // },

      // {
      //   state: 'III Term', type: 'sub', name: 'III Term', children: [

      //     {
      //       state: 'Paper 1', type: 'sub', name: 'Paper 1', children: [
      //         { state: 'Military History', name: 'Military History', type: 'link' },
      //         { state: 'Military Geography', name: 'Military Geography', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 2', type: 'sub', name: 'Paper 2', children: [
      //         { state: 'CAIR', name: 'CAIR ', type: 'link' },
      //         { state: 'BS', name: 'BS', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 3', type: 'sub', name: 'Paper 3', children: [
      //         { state: 'Science and Warfare', name: 'Science & Warfare', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 4', type: 'sub', name: 'Paper 4', children: [
      //         { state: 'SWT', name: 'SWT', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 5', type: 'sub', name: 'Paper 5', children: [
      //         { state: 'ECS', name: 'ECS', type: 'link' },
      //       ]
      //     },
      //     {
      //       state: 'Paper 6', type: 'sub', name: 'Paper 6', children: [
      //         { state: 'IT', name: 'IT ', type: 'link' },
      //       ]
      //     }
      //   ]
      // },
    

      //menu item change work
      {
        state: 'Paper 1', type: 'sub', name: 'Paper 1', children: [
          { state: 'Military History', type: 'sub', name: 'Military History',children:[
              {state: 'I Term', name: 'I Term', type: 'link' },
              {state: 'II Tech', name: 'II Tech', type: 'link' },
              {state: 'II Term', name: 'II Term', type: 'link' },
              {state: 'III Term', name: 'III Term', type: 'link' },
          ]
         },
          { state: 'Military Geography', type: 'sub',  name: 'Military Geography',children:[
            {state: 'I Term', name: 'I Term', type: 'link' },
            {state: 'II Tech', name: 'II Tech', type: 'link' },
            {state: 'II Term', name: 'II Term', type: 'link' },
            {state: 'III Term', name: 'III Term', type: 'link' },
        ]
       },
        ]
      },
      {
        state: 'Paper 2', type: 'sub', name: 'Paper 2', children: [
          { state: 'CAIR',type: 'sub', name: 'CAIR ',children:[
            {state: 'I Term', name: 'I Term', type: 'link' },
            {state: 'II Tech', name: 'II Tech', type: 'link' },
            {state: 'II Term', name: 'II Term', type: 'link' },
            {state: 'III Term', name: 'III Term', type: 'link' },
        ]},
          { state: 'BS',type: 'sub', name: 'BS', children:[
            {state: 'I Term', name: 'I Term', type: 'link' },
            {state: 'II Tech', name: 'II Tech', type: 'link' },
            {state: 'II Term', name: 'II Term', type: 'link' },
            {state: 'III Term', name: 'III Term', type: 'link' },
        ] },
        ]
      },
      {
        state: 'Paper 3', type: 'sub', name: 'Paper 3', children: [
          { state: 'Science and Warfare', type: 'sub', name: 'Science & Warfare', children:[
            {state: 'I Term', name: 'I Term', type: 'link' },
            {state: 'II Tech', name: 'II Tech', type: 'link' },
            {state: 'II Term', name: 'II Term', type: 'link' },
            {state: 'III Term', name: 'III Term', type: 'link' },
        ] },
        ]
      },
      {
        state: 'Paper 4', type: 'sub', name: 'Paper 4', children: [
          { state: 'SWT',  type: 'sub', name: 'SWT', children:[
            {state: 'I Term', name: 'I Term', type: 'link' },
            {state: 'II Tech', name: 'II Tech', type: 'link' },
            {state: 'II Term', name: 'II Term', type: 'link' },
            {state: 'III Term', name: 'III Term', type: 'link' },
        ] },
        ]
      },
      {
        state: 'Paper 5', type: 'sub', name: 'Paper 5', children: [
          { state: 'ECS', type: 'sub', name: 'ECS', children:[
            {state: 'I Term', name: 'I Term', type: 'link' },
            {state: 'II Tech', name: 'II Tech', type: 'link' },
            {state: 'II Term', name: 'II Term', type: 'link' },
            {state: 'III Term', name: 'III Term', type: 'link' },
        ] },
        ]
      },
      {
        state: 'Paper 6', type: 'sub', name: 'Paper 6', children: [
          { state: 'IT',  type: 'sub', name: 'IT ', children:[
            {state: 'I Term', name: 'I Term', type: 'link' },
            {state: 'II Tech', name: 'II Tech', type: 'link' },
            {state: 'II Term', name: 'II Term', type: 'link' },
            {state: 'III Term', name: 'III Term', type: 'link' },
        ] },
        ]
      },


    ]
  },
  {
    id: 25,
    state: 'main/academic-depart/syllabus',
    name: 'SYLLABUS',
    type: 'sub',
    // icon: 'map',
    children: [
      {
        state: 'I Term', type: 'sub', name: 'I Term', children: [

          {
            state: 'Paper 1', type: 'sub', name: 'Paper 1', children: [
              { state: 'Military History', name: 'Military History', type: 'link' },
              { state: 'Military Geography', name: 'Military Geography', type: 'link' },
            ]
          },
          {
            state: 'Paper 2', type: 'sub', name: 'Paper 2', children: [
              { state: 'CAIR', name: 'CAIR ', type: 'link' },
              { state: 'BS', name: 'BS', type: 'link' },
            ]
          },
          {
            state: 'Paper 3', type: 'sub', name: 'Paper 3', children: [
              { state: 'Science and Warfare', name: 'Science & Warfare', type: 'link' },
            ]
          },
          {
            state: 'Paper 4', type: 'sub', name: 'Paper 4', children: [
              { state: 'SWT', name: 'SWT', type: 'link' },
            ]
          },
          {
            state: 'Paper 5', type: 'sub', name: 'Paper 5', children: [
              { state: 'ECS', name: 'ECS', type: 'link' },
            ]
          },
          {
            state: 'Paper 6', type: 'sub', name: 'Paper 6', children: [
              { state: 'IT', name: 'IT ', type: 'link' },
            ]
          }

        ]
      },

      {
        state: 'II Tech', type: 'sub', name: 'II Tech', children: [

          {
            state: 'Paper 1', type: 'sub', name: 'Paper 1', children: [
              { state: 'Military History', name: 'Military History', type: 'link' },
              { state: 'Military Geography', name: 'Military Geography', type: 'link' },
            ]
          },
          {
            state: 'Paper 2', type: 'sub', name: 'Paper 2', children: [
              { state: 'CAIR', name: 'CAIR ', type: 'link' },
              { state: 'BS', name: 'BS', type: 'link' },
            ]
          },
          {
            state: 'Paper 3', type: 'sub', name: 'Paper 3', children: [
              { state: 'Science and Warfare', name: 'Science & Warfare', type: 'link' },
            ]
          },
          {
            state: 'Paper 4', type: 'sub', name: 'Paper 4', children: [
              { state: 'SWT', name: 'SWT', type: 'link' },
            ]
          },
          {
            state: 'Paper 5', type: 'sub', name: 'Paper 5', children: [
              { state: 'ECS', name: 'ECS', type: 'link' },
            ]
          },
          {
            state: 'Paper 6', type: 'sub', name: 'Paper 6', children: [
              { state: 'IT', name: 'IT ', type: 'link' },
            ]
          }
        ]
      },

      {
        state: 'II Term', type: 'sub', name: 'II Term', children: [

          {
            state: 'Paper 1', type: 'sub', name: 'Paper 1', children: [
              { state: 'Military History', name: 'Military History', type: 'link' },
              { state: 'Military Geography', name: 'Military Geography', type: 'link' },
            ]
          },
          {
            state: 'Paper 2', type: 'sub', name: 'Paper 2', children: [
              { state: 'CAIR', name: 'CAIR ', type: 'link' },
              { state: 'BS', name: 'BS', type: 'link' },
            ]
          },
          {
            state: 'Paper 3', type: 'sub', name: 'Paper 3', children: [
              { state: 'Science and Warfare', name: 'Science & Warfare', type: 'link' },
            ]
          },
          {
            state: 'Paper 4', type: 'sub', name: 'Paper 4', children: [
              { state: 'SWT', name: 'SWT', type: 'link' },
            ]
          },
          {
            state: 'Paper 5', type: 'sub', name: 'Paper 5', children: [
              { state: 'ECS', name: 'ECS', type: 'link' },
            ]
          },
          {
            state: 'Paper 6', type: 'sub', name: 'Paper 6', children: [
              { state: 'IT', name: 'IT ', type: 'link' },
            ]
          }
        ]
      },

      {
        state: 'III Term', type: 'sub', name: 'III Term', children: [

          {
            state: 'Paper 1', type: 'sub', name: 'Paper 1', children: [
              { state: 'Military History', name: 'Military History', type: 'link' },
              { state: 'Military Geography', name: 'Military Geography', type: 'link' },
            ]
          },
          {
            state: 'Paper 2', type: 'sub', name: 'Paper 2', children: [
              { state: 'CAIR', name: 'CAIR ', type: 'link' },
              { state: 'BS', name: 'BS', type: 'link' },
            ]
          },
          {
            state: 'Paper 3', type: 'sub', name: 'Paper 3', children: [
              { state: 'Science and Warfare', name: 'Science & Warfare', type: 'link' },
            ]
          },
          {
            state: 'Paper 4', type: 'sub', name: 'Paper 4', children: [
              { state: 'SWT', name: 'SWT', type: 'link' },
            ]
          },
          {
            state: 'Paper 5', type: 'sub', name: 'Paper 5', children: [
              { state: 'ECS', name: 'ECS', type: 'link' },
            ]
          },
          {
            state: 'Paper 6', type: 'sub', name: 'Paper 6', children: [
              { state: 'IT', name: 'IT ', type: 'link' },
            ]
          }
        ]
      },


    ]
    // children: [
    //   {
    //     state: 'I Term', type: 'sub', name: 'I Term', children: [

    //       {
    //         state: 'Paper 1', type: 'link', name: 'Paper 1',
    //       },
    //       {
    //         state: 'Paper 2', type: 'link', name: 'Paper 2',
    //       },
    //       {
    //         state: 'Paper 3', type: 'link', name: 'Paper 3',
    //       },
    //       {
    //         state: 'Paper 4', type: 'link', name: 'Paper 4',
    //       },
    //       {
    //         state: 'Paper 5', type: 'link', name: 'Paper 5',
    //       },
    //       {
    //         state: 'Paper 6', type: 'link', name: 'Paper 6',
    //       }

    //     ]
    //   },

    //   {
    //     state: 'II Tech', type: 'sub', name: 'II Tech', children: [

    //       {
    //         state: 'Paper 1', type: 'link', name: 'Paper 1',
    //       },
    //       {
    //         state: 'Paper 2', type: 'link', name: 'Paper 2',
    //       },
    //       {
    //         state: 'Paper 3', type: 'link', name: 'Paper 3',
    //       },
    //       {
    //         state: 'Paper 4', type: 'link', name: 'Paper 4',
    //       },
    //       {
    //         state: 'Paper 5', type: 'link', name: 'Paper 5',
    //       },
    //       {
    //         state: 'Paper 6', type: 'link', name: 'Paper 6',
    //       }
    //     ]
    //   },

    //   {
    //     state: 'II Term', type: 'sub', name: 'II Term', children: [

    //       {
    //         state: 'Paper 1', type: 'link', name: 'Paper 1',
    //       },
    //       {
    //         state: 'Paper 2', type: 'link', name: 'Paper 2',
    //       },
    //       {
    //         state: 'Paper 3', type: 'link', name: 'Paper 3',
    //       },
    //       {
    //         state: 'Paper 4', type: 'link', name: 'Paper 4',
    //       },
    //       {
    //         state: 'Paper 5', type: 'link', name: 'Paper 5'
    //       },
    //       {
    //         state: 'Paper 6', type: 'link', name: 'Paper 6',
    //       }
    //     ]
    //   },

    //   {
    //     state: 'III Term', type: 'sub', name: 'III Term', children: [

    //       {
    //         state: 'Paper 1', type: 'link', name: 'Paper 1',
    //       },
    //       {
    //         state: 'Paper 2', type: 'link', name: 'Paper 2'
    //       },
    //       {
    //         state: 'Paper 3', type: 'link', name: 'Paper 3'
    //       },
    //       {
    //         state: 'Paper 4', type: 'link', name: 'Paper 4'
    //       },
    //       {
    //         state: 'Paper 5', type: 'link', name: 'Paper 5'
    //       },
    //       {
    //         state: 'Paper 6', type: 'link', name: 'Paper 6'
    //       }
    //     ]
    //   },
    // ]
  },
  {
    id: 26,
    state: 'main/academic-depart/assignments',
    name: 'ASSIGNMENTS',
    type: 'sub',
    // icon: 'map',
    children: [
      {
        state: 'I Term', type: 'sub', name: 'I Term', children: [
          {
            state: 'Paper 1', type: 'sub', name: 'Paper 1', children: [
              { state: 'Military History', name: 'Military History', type: 'link' },
              { state: 'Military Geography', name: 'Military Geography', type: 'link' },
            ]
          },
          {
            state: 'Paper 2', type: 'sub', name: 'Paper 2', children: [
              { state: 'CAIR', name: 'CAIR ', type: 'link' },
              { state: 'BS', name: 'BS', type: 'link' },
            ]
          },
          {
            state: 'Paper 3', type: 'sub', name: 'Paper 3', children: [
              { state: 'Science and Warfare', name: 'Science & Warfare', type: 'link' },
            ]
          },
          {
            state: 'Paper 4', type: 'sub', name: 'Paper 4', children: [
              { state: 'SWT', name: 'SWT', type: 'link' },
            ]
          },
          {
            state: 'Paper 5', type: 'sub', name: 'Paper 5', children: [
              { state: 'ECS', name: 'ECS', type: 'link' },
            ]
          },
          {
            state: 'Paper 6', type: 'sub', name: 'Paper 6', children: [
              { state: 'IT', name: 'IT ', type: 'link' },
            ]
          }
        ]
      },

      {
        state: 'II Tech', type: 'sub', name: 'II Tech', children: [
          {
            state: 'Paper 1', type: 'sub', name: 'Paper 1', children: [
              { state: 'Military History', name: 'Military History', type: 'link' },
              { state: 'Military Geography', name: 'Military Geography', type: 'link' },
            ]
          },
          {
            state: 'Paper 2', type: 'sub', name: 'Paper 2', children: [
              { state: 'CAIR', name: 'CAIR ', type: 'link' },
              { state: 'BS', name: 'BS', type: 'link' },
            ]
          },
          {
            state: 'Paper 3', type: 'sub', name: 'Paper 3', children: [
              { state: 'Science and Warfare', name: 'Science & Warfare', type: 'link' },
            ]
          },
          {
            state: 'Paper 4', type: 'sub', name: 'Paper 4', children: [
              { state: 'SWT', name: 'SWT', type: 'link' },
            ]
          },
          {
            state: 'Paper 5', type: 'sub', name: 'Paper 5', children: [
              { state: 'ECS', name: 'ECS', type: 'link' },
            ]
          },
          {
            state: 'Paper 6', type: 'sub', name: 'Paper 6', children: [
              { state: 'IT', name: 'IT ', type: 'link' },
            ]
          }
        ]
      },

      {
        state: 'II Term', type: 'sub', name: 'II Term', children: [
          {
            state: 'Paper 1', type: 'sub', name: 'Paper 1', children: [
              { state: 'Military History', name: 'Military History', type: 'link' },
              { state: 'Military Geography', name: 'Military Geography', type: 'link' },
            ]
          },
          {
            state: 'Paper 2', type: 'sub', name: 'Paper 2', children: [
              { state: 'CAIR', name: 'CAIR ', type: 'link' },
              { state: 'BS', name: 'BS', type: 'link' },
            ]
          },
          {
            state: 'Paper 3', type: 'sub', name: 'Paper 3', children: [
              { state: 'Science and Warfare', name: 'Science & Warfare', type: 'link' },
            ]
          },
          {
            state: 'Paper 4', type: 'sub', name: 'Paper 4', children: [
              { state: 'SWT', name: 'SWT', type: 'link' },
            ]
          },
          {
            state: 'Paper 5', type: 'sub', name: 'Paper 5', children: [
              { state: 'ECS', name: 'ECS', type: 'link' },
            ]
          },
          {
            state: 'Paper 6', type: 'sub', name: 'Paper 6', children: [
              { state: 'IT', name: 'IT ', type: 'link' },
            ]
          }
        ]
      },

      {
        state: 'III Term', type: 'sub', name: 'III Term', children: [
          {
            state: 'Paper 1', type: 'sub', name: 'Paper 1', children: [
              { state: 'Military History', name: 'Military History', type: 'link' },
              { state: 'Military Geography', name: 'Military Geography', type: 'link' },
            ]
          },
          {
            state: 'Paper 2', type: 'sub', name: 'Paper 2', children: [
              { state: 'CAIR', name: 'CAIR ', type: 'link' },
              { state: 'BS', name: 'BS', type: 'link' },
            ]
          },
          {
            state: 'Paper 3', type: 'sub', name: 'Paper 3', children: [
              { state: 'Science and Warfare', name: 'Science & Warfare', type: 'link' },
            ]
          },
          {
            state: 'Paper 4', type: 'sub', name: 'Paper 4', children: [
              { state: 'SWT', name: 'SWT', type: 'link' },
            ]
          },
          {
            state: 'Paper 5', type: 'sub', name: 'Paper 5', children: [
              { state: 'ECS', name: 'ECS', type: 'link' },
            ]
          },
          {
            state: 'Paper 6', type: 'sub', name: 'Paper 6', children: [
              { state: 'IT', name: 'IT ', type: 'link' },
            ]
          }
        ]
      },


    ]
  },
  {
    id: 27,
    state: 'main/academic-depart/examination',
    name: 'EXAMINATION',
    type: 'sub',
    children: [
      {
        state: 'Distribution-of-Marks', type: 'sub', name: 'Distribution of Marks', children: [
          {
            state: 'I Term', type: 'link', name: 'I Term',
          },
          {
            state: 'II Term', type: 'link', name: 'II Term',
          },
          {
            state: 'II Tech', type: 'link', name: 'II Tech',
          },
          {
            state: 'III Term', type: 'link', name: 'III Term',
          },

        ]
      },
      {
        state: 'Exam-schedule', type: 'sub', name: 'Exam Schedule', children: [
          {
            state: 'Exam-I-Term', type: 'link', name: 'I Term',
          },
          {
            state: 'Exam-II-Term', type: 'link', name: 'II Term',
          },
          {
            state: 'Exam-II-Tech', type: 'link', name: 'II Tech',
          },
          {
            state: 'Exam-III-Term', type: 'link', name: 'III Term',
          },

        ]
      },
      // {
      //   state: 'Result Analysis', type: 'link', name: 'Result Analysis'
      // },
      {
        state: 'Assessment', type: 'sub', name: 'Assessment', children: [

          {
            state: 'I Term', type: 'sub', name: 'I Term', children: [

              {
                state: 'leadership-development-matrix', type: 'link', name: 'Leadership Development Matrix',
              },
              {
                state: 'oq-matrix',
                name: 'OQ Matrix',
                type: 'sub',
                // icon: 'map',
                children: [
                  {
                    state: 'Mid-Term', type: 'link', name: 'Mid Term',
                  },
                  {
                    state: 'Final-Term', type: 'link', name: 'Final Term',
                  }
                ]

              },
              {
                state: 'Credit-for-Excellence', type: 'link', name: 'Credit for Excellence',
              },

              {
                state: 'intellectual',
                name: 'INTELLECTUAL SKILLS DEVP',
                type: 'sub',
                // icon: 'map',
                children: [
                  {
                    state: 'Final-Term', type: 'link', name: 'Final Term',
                  }
                ]

              }



            ]
          },

          {
            state: 'II Term', type: 'sub', name: 'II Term', children: [

              {
                state: 'leadership-development-matrix', type: 'link', name: 'Leadership Development Matrix',
              },
              {
                state: 'oq-matrix',
                name: 'OQ Matrix',
                type: 'sub',
                // icon: 'map',
                children: [
                  {
                    state: 'Mid-Term', type: 'link', name: 'Mid Term',
                  },
                  {
                    state: 'Final-Term', type: 'link', name: 'Final Term',
                  }
                ]

              },
              {
                state: 'Credit-for-Excellence', type: 'link', name: 'Credit for Excellence',
              },

              {
                state: 'intellectual',
                name: 'INTELLECTUAL SKILLS DEVP',
                type: 'sub',
                // icon: 'map',
                children: [
                  {
                    state: 'Mid-Term', type: 'link', name: 'Mid Term',
                  },
                  {
                    state: 'Final-Term', type: 'link', name: 'Final Term',
                  }
                ]

              }
            ]
          },

          {
            state: 'II Tech', type: 'sub', name: 'II Tech', children: [

              {
                state: 'leadership-development-matrix', type: 'link', name: 'Leadership Development Matrix',
              },
              {
                state: 'oq-matrix',
                name: 'OQ Matrix',
                type: 'sub',
                // icon: 'map',
                children: [
                  {
                    state: 'Mid-Term', type: 'link', name: 'Mid Term',
                  },
                  {
                    state: 'Final-Term', type: 'link', name: 'Final Term',
                  }
                ]

              },
              {
                state: 'Credit-for-Excellence', type: 'link', name: 'Credit for Excellence',
              },
              {
                state: 'intellectual',
                name: 'INTELLECTUAL SKILLS DEVP',
                type: 'sub',
                // icon: 'map',
                children: [
                  {
                    state: 'Mid-Term', type: 'link', name: 'Mid Term',
                  },
                  {
                    state: 'Final-Term', type: 'link', name: 'Final Term',
                  }
                ]

              }
            ]
          },

          {
            state: 'III Term', type: 'sub', name: 'III Term', children: [

              {
                state: 'leadership-development-matrix', type: 'link', name: 'Leadership Development Matrix',
              },
              {
                state: 'oq-matrix',
                name: 'OQ Matrix',
                type: 'sub',
                // icon: 'map',
                children: [
                  {
                    state: 'Mid-Term', type: 'link', name: 'Mid Term',
                  },
                  {
                    state: 'Final-Term', type: 'link', name: 'Final Term',
                  }
                ]

              },
              {
                state: 'Credit-for-Excellence', type: 'link', name: 'Credit for Excellence',
              },

              {
                state: 'intellectual',
                name: 'INTELLECTUAL SKILLS DEVP',
                type: 'sub',
                // icon: 'map',
                children: [

                  {
                    state: 'Final-Term', type: 'link', name: 'Final Term',
                  }
                ]

              }
            ]
          },





          // {
          //   state: 'leadership-development-matrix', type: 'link', name: 'Leadership Development Matrix',
          // },
          // {
          //   state: 'oq-matrix', type: 'link', name: 'OQ Matrix',
          // },
          // {
          //   state: 'Credit-for-Excellence', type: 'link', name: 'Credit for Excellence',
          // },

        ]
      },
      { state: 'pcht', name: 'PCHT', type: 'link' },

      { state: 'goi', name: 'OL of GOI', type: 'link' },


    ]
    // icon: ''
  },
  // {
  //   id: 28,
  //   state: '',
  //   name: 'PUBLICATIONS',
  //   type: 'sub',
  //   children: [
  //     {
  //       state: 'Quest', type: 'link', name: 'Quest'
  //     },
  //     {
  //       state: 'IMA Journal ', type: 'link', name: 'IMA Journal '
  //     },
  //     {
  //       state: 'FFL Newsletter', type: 'link', name: 'FFL Newsletter'
  //     },
  //     {
  //       state: 'Academy Newsletter', type: 'link', name: 'Academy Newsletter'
  //     },
  //     {
  //       state: 'Reflective Writing', type: 'link', name: 'Reflective Writing'
  //     },
  //   ]
  //   // icon: ''
  // },
  {
    id: 29,
    state: 'main/academic-depart/achievements',
    name: 'ACHIEVEMENTS',
    type: 'sub',
    children: [
      {
        state: 'awards', type: 'link', name: 'Awards & Medals'
      },
      {
        state: 'book', type: 'link', name: 'Book Prizes'
      },
    ]
  },
  {
    id: 30,
    state: 'main/academic-depart/clubs',
    name: 'CLUBS',
    type: 'sub',
    children: [
      {
        state: 'day-wise', type: 'link', name: 'Day Wise Programme'
      },
      {
        state: 'sops', type: 'link', name: 'SOPs'
      },
      {
        state: 'nominal', type: 'link', name: 'OC Nominal Roll'
      },

    ]
  },
  {
    id: 31,
    state: 'main/academic-depart/general',
    name: 'SOPs / GENERAL INSTRUCTIONS',
    type: 'sub',
    children: [
      {
        state: 'exam', type: 'link', name: 'Exam Cell'
      },
      {
        state: 'hindi', type: 'link', name: 'Hindi Cell'
      },

      {
        state: 'curricular', type: 'sub', name: 'Co-Curricular Activities', children: [
          {
            state: 'hindi', type: 'link', name: 'Hindi Debate'
          },
          {
            state: 'english', type: 'link', name: 'English Debate'
          },
          {
            state: 'quiz', type: 'link', name: 'Quiz'
          },
          {
            state: 'cyber', type: 'link', name: 'Cyber'
          },
          {
            state: 'ppt', type: 'link', name: 'PPT'
          }
        ]
      },

    ]
  },
  {
    id: 32,
    state: 'main/academic-depart/counsellors',
    name: 'COUNSELLORS',
    type: 'sub',
    children: [

      {
        state: 'cabn', type: 'sub', name: 'Ca Bn', children: [
          {
            state: 'counsellors-kohima', type: 'link', name: 'Kohima Coy'
          },
          {
            state: 'counsellors-naushera', type: 'link', name: 'Naushera Coy'
          },
          {
            state: 'counsellors-poonach', type: 'link', name: 'Poonch Coy'
          },
          {
            state: 'counsellors-hajipir', type: 'link', name: 'Hajipir Coy'
          }
        ]
      },
      {
        state: 'thbn', type: 'sub', name: 'Th Bn', children: [
          {
            state: 'counsellors-meiktila', type: 'link', name: 'Meiktila Coy'
          },
          {
            state: 'counsellors-alamein', type: 'link', name: 'Alamein Coy'
          },
          {
            state: 'counsellors-dograi', type: 'link', name: 'Dograi Coy'
          },
          {
            state: 'counsellors-chushul', type: 'link', name: 'Chushul Coy'
          }
        ]
      },
      {
        state: 'mabn', type: 'sub', name: 'Ma Bn', children: [
          {
            state: 'counsellors-zojila', type: 'link', name: 'Zojila Coy'
          },
          {
            state: 'counsellors-imphal', type: 'link', name: 'Imphal Coy'
          },
          {
            state: 'counsellors-jessore', type: 'link', name: 'Jessore Coy'
          },
          {
            state: 'counsellors-sangro', type: 'link', name: 'Sangro Coy'
          }
        ]
      },
      {
        state: 'bhbn', type: 'sub', name: 'Bh Bn', children: [
          {
            state: 'counsellors-cassino', type: 'link', name: 'Cassino Coy'
          },
          {
            state: 'counsellors-keren', type: 'link', name: 'Keren Coy'
          },
          {
            state: 'counsellors-singarh', type: 'link', name: 'Singarh Coy'
          },
          {
            state: 'counsellors-basantar', type: 'link', name: 'Basantar Coy'
          }
        ]
      },

    ]
  },
  {
    id: "common",
    state: 'main/academic-depart/i-card',
    name: 'Officers I-Cards Lost',
    type: 'link',
    // icon: ''
  },
  {
    id: 'common',
    state: 'main/academic-depart/ima-blog',
    name: 'IMA Blog',
    type: 'link',
    // icon: ''
  },
  {
    id: "common",
    state: 'main/academic-depart/it',
    name: 'Complaints/Requirement',
    type: 'link',
    // icon: ''
  },


]

const DELAY_DASHBOARD_MENU = [
  {
    state: 'main/delay-dashboard/training-team',
    name: 'TRG Team',
    type: 'sub',
    // icon: 'map',
    children: [
      {
        state: 'I Term', type: 'link', name: 'I Term',
      },
      {
        state: 'II Term', type: 'link', name: 'II Term',
      },
      {
        state: 'II Tech', type: 'link', name: 'II Tech',
      },
      {
        state: 'III Term', type: 'link', name: 'III Term',
      },
    ]
  },
  {
    state: 'main/delay-dashboard/training-battalion',
    name: 'TRG Battalion',
    type: 'sub',
    // icon: 'map',
    children: [
      {
        state: 'I Term', type: 'link', name: 'I Term',
      },
      {
        state: 'II Term', type: 'link', name: 'II Term',
      },
      {
        state: 'II Tech', type: 'link', name: 'II Tech',
      },
      {
        state: 'III Term', type: 'link', name: 'III Term',
      },
    ]
  },
  {
    state: 'main/delay-dashboard/academic-department',
    name: 'Academic Department',
    type: 'sub',
    // icon: 'map',
    children: [
      {
        state: 'I Term', type: 'link', name: 'I Term',
      },
      {
        state: 'II Term', type: 'link', name: 'II Term',
      },
      {
        state: 'II Tech', type: 'link', name: 'II Tech',
      },
      {
        state: 'III Term', type: 'link', name: 'III Term',
      },
    ]
  },
  {
    state: 'main/delay-dashboard/adjutant-branch',
    name: 'Adjutant Branch',
    type: 'sub',
    // icon: 'map',
    children: [
      {
        state: 'I Term', type: 'link', name: 'I Term',
      },
      {
        state: 'II Term', type: 'link', name: 'II Term',
      },
      {
        state: 'II Tech', type: 'link', name: 'II Tech',
      },
      {
        state: 'III Term', type: 'link', name: 'III Term',
      },
    ]
  },
]



@Injectable()
export class MenuItems {

  getTrgMenu(): Menu[] {
    return TRG_TEAM_MENU;
  }
  getAdminMenu(): Menu[] {
    return AdminMenus;
  }
  getTRGBattalionMenus(): Menu[] {
    return TRGBattalionMenus;
  }
  getAdjutant(): Menu[] {
    return ADJUTANT_MENU;
  }
  getGSBranchMenus(): Menu[] {
    return GS_BRANCH_MENUS;
  }
  getExerciseTypeMenus(): Menu[] {
    return GS_EXERCISE_TYPE_MENUS;
  }
  getAcademicDepartMenus(): Menu[] {
    return ACADEMIC_DEPARTMENT;
  }
  getDelayDashboardMenus(): Menu[] {
    return DELAY_DASHBOARD_MENU;
  }
}