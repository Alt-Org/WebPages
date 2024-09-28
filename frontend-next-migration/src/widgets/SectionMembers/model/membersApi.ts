// membersApi.ts

import { envHelper } from '@/shared/const/envHelper';
import { Member, Team } from '../model/types';
import { mapMembers, mapDepartments } from '../model/mappers'; // Import mappers

// Fetch Teams
export const fetchTeams = async (locale: string = 'en'): Promise<Team[]> => {
  try {
    const strapiLocale = locale === 'fi' ? 'fi-FI' : 'en';

    // Fetch data including localized departments and members
    const response = await fetch(
      `${envHelper.strapiApiUrl}/teams?locale=${strapiLocale}&populate=departments.localizations,members,departments.members`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching teams: ${response.statusText}`);
    }

    const teamData = await response.json();

    // Map teams and assign their respective members and departments
    const teams: Team[] = teamData.data.map((item: any) => {
      // Map team-level members (members who are not part of any specific department)
      let members = mapMembers(item.attributes.members?.data || []);

      // Map departments related to the team
      const departments = mapDepartments(
        item.attributes.departments?.data || [],
        strapiLocale,
      );

      // Collect all member IDs that are assigned to departments
      const departmentMemberIds = departments.flatMap((dept) =>
        dept.members.map((member) => member.id),
      );

      // Filter out members from team-level members that are already in a department
      members = members.filter(
        (member) => !departmentMemberIds.includes(member.id),
      );

      return {
        id: item.id,
        name: item.attributes.Team || item.attributes.Name,
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
        locale: item.attributes.locale,
        members,
        departments,
      };
    });

    // Order teams by predefined lists
    const orderEn = [
      'Game Design',
      'Mentoring',
      'Programming',
      'Graphics',
      'Sounds',
      'Comic book',
      'Production',
      'Analysis',
      'Art',
      'Game Art Education Package',
      'Other Participants',
      'Special Thanks',
    ];

    const orderFi = [
      'Pelisuunnittelu',
      'Mentorointi',
      'Ohjelmointi',
      'Grafiikka',
      'Äänet',
      'Sarjakuva',
      'Tuotanto',
      'Analyysi',
      'Pelitaiteen opetuspaketti',
      'Muut mukana olleet',
      'Erityiskiitokset',
    ];

    const order = locale === 'fi' ? orderFi : orderEn;

    // Sort teams based on the order
    return teams.sort(
      (a: Team, b: Team) => order.indexOf(a.name) - order.indexOf(b.name),
    );
  } catch (error) {
    console.error('Error fetching teams data:', error);
    return [];
  }
};
